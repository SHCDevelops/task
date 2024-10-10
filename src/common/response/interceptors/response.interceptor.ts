import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { ResponseDto, ResponseMetadataDto } from "../dtos/response.dto";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { IRequestApp } from "src/common/request/interfaces/request.interface";
import { Response } from "express";
import { IResponse } from "../interfaces/response.interface";

@Injectable()
export class ResponseInterceptor implements NestInterceptor<Promise<ResponseDto>> {
    constructor(
        private readonly reflector: Reflector,
    ) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<Promise<ResponseDto>>> {
        if (context.getType() === 'http') {
            return next.handle().pipe(
                map((res: Promise<any>) => this.createResponse(context, res))
            );
        }

        return next.handle();
    }

    private async createResponse(context: ExecutionContext, res: Promise<any>): Promise<ResponseDto> {
        const ctx: HttpArgumentsHost = context.switchToHttp();
        const response: Response = ctx.getResponse();
        const request: IRequestApp = ctx.getRequest<IRequestApp>();

        let httpStatus: HttpStatus = response.statusCode;
        let statusCode: number = response.statusCode;
        let data: Record<string, any>[] = [];

        // metadata
        const xPath = request.path;

        let metadata: ResponseMetadataDto = {
            path: xPath,
        };

        // response
        const responseData = (await res) as IResponse<any>;
        if (responseData) {
            const { _metadata } = responseData;

            data = responseData.data;
            httpStatus =
                _metadata?.customProperty?.httpStatus ?? httpStatus;
            statusCode =
                _metadata?.customProperty?.statusCode ?? statusCode;

            delete _metadata?.customProperty;

            metadata = {
                ...metadata,
                ..._metadata,
            };
        }

        response.status(httpStatus);
        
        return {
            statusCode,
            _metadata: metadata,
            data,
        };
    }
}   