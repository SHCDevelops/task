import { CallHandler, ExecutionContext, HttpStatus, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { ResponsePagingDto, ResponsePagingMetadataCursorDto, ResponsePagingMetadataDto } from "../dtos/response.paging.dto";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Reflector } from "@nestjs/core";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from 'express';
import { IRequestApp } from "src/common/request/interfaces/request.interface";
import { IResponsePaging } from "../interfaces/response.interface";
import qs from 'qs';


@Injectable()
export class ResponsePagingInterceptor implements NestInterceptor<Promise<ResponsePagingDto>> {
    private readonly logger = new Logger(ResponsePagingInterceptor.name);

    constructor(
        private readonly reflector: Reflector,
    ) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<Promise<ResponsePagingDto>>> {
        if (context.getType() === 'http') {
            return next.handle().pipe(
                map((res: Promise<any>) => this.createResponse(context, res))
            );
        }

        return next.handle();
    }

    private async createResponse(context: ExecutionContext, res: Promise<any>): Promise<ResponsePagingDto> {
        const ctx: HttpArgumentsHost = context.switchToHttp();
        const response: Response = ctx.getResponse();
        const request: IRequestApp = ctx.getRequest<IRequestApp>();

        let httpStatus: HttpStatus = response.statusCode;
        let statusCode: number = response.statusCode;
        let data: Record<string, any>[] = [];

        // metadata
        const xPath = request.path;
        const xPagination = request.__pagination;

        let metadata: ResponsePagingMetadataDto = {
            path: xPath,
        };

        // response
        const responseData = (await res) as IResponsePaging<any>;
        if (!responseData) {
            throw new Error(
                'ResponsePaging must instanceof IResponsePaging'
            );
        } else if (
            !responseData.data ||
            !Array.isArray(responseData.data)
        ) {
            throw new Error(
                'Field data must in array and can not be empty'
            );
        }

        const { _metadata } = responseData;

        data = responseData.data;
        httpStatus =
            _metadata?.customProperty?.httpStatus ?? httpStatus;
        statusCode =
            _metadata?.customProperty?.statusCode ?? statusCode;
        
        delete _metadata?.customProperty;

        // metadata pagination
        const { query } = request;
        delete query.perPage;
        delete query.page;

        const total: number = responseData._pagination.total;
        const totalPage: number =
            responseData._pagination.totalPage;
        const perPage: number = xPagination.perPage;
        const page: number = xPagination.page;

        const queryString = qs.stringify(query, {
            encode: false,
        });

        const cursorPaginationMetadata: ResponsePagingMetadataCursorDto =
            {
                nextPage:
                    page < totalPage
                        ? queryString
                            ? `${xPath}?perPage=${perPage}&page=${
                                  page + 1
                              }&${queryString}`
                            : `${xPath}?perPage=${perPage}&page=${page + 1}`
                        : undefined,
                previousPage:
                    page > 1
                        ? queryString
                            ? `${xPath}?perPage=${perPage}&page=${
                                  page - 1
                              }&${queryString}`
                            : `${xPath}?perPage=${perPage}&page=${page - 1}`
                        : undefined,
                firstPage:
                    totalPage > 1
                        ? queryString
                            ? `${xPath}?perPage=${perPage}&page=${1}&${queryString}`
                            : `${xPath}?perPage=${perPage}&page=${1}`
                        : undefined,
                lastPage:
                    totalPage > 1
                        ? queryString
                            ? `${xPath}?perPage=${perPage}&page=${totalPage}&${queryString}`
                            : `${xPath}?perPage=${perPage}&page=${totalPage}`
                        : undefined,
            }

        metadata = {
            ...metadata,
            ..._metadata,
            pagination: {
                ...xPagination,
                ...metadata._pagination,
                total,
                totalPage: data.length > 0 ? totalPage : 0,
            },
        };

        metadata.cursor = cursorPaginationMetadata;

        response.status(httpStatus);

        return {
            statusCode,
            _metadata: metadata,
            data,
        };
    }
}