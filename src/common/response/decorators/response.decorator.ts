import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ResponsePagingInterceptor } from "../interceptors/response.paging.interceptor";
import { ResponseInterceptor } from "../interceptors/response.interceptor";

export function ResponsePaging(): MethodDecorator {
    return applyDecorators(
        UseInterceptors(ResponsePagingInterceptor),
    );
}

export function Response(): MethodDecorator {
    return applyDecorators(
        UseInterceptors(ResponseInterceptor),
    );
}