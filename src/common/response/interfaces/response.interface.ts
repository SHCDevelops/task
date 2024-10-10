import { HttpStatus } from "@nestjs/common";

export interface IResponseCustomProperty {
    statusCode?: number;
    httpStatus?: HttpStatus;
}

// metadata
export interface IResponseMetadata {
    customProperty?: IResponseCustomProperty;
    [key: string]: any;
}

// response pagination
export interface IResponsePagingPagination {
    totalPage: number;
    total: number;
}

export interface IResponsePaging<T> {
    _metadata?: IResponseMetadata;
    _pagination: IResponsePagingPagination;
    data: T[];
}

export interface IResponse<T = void> {
    _metadata?: IResponseMetadata;
    data?: T;
}