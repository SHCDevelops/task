import { ClassConstructor } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../constants/doc.enum.constant';

export interface IDocOptions {
    summary?: string;
    operation?: string;
    deprecated?: boolean;
    description?: string;
}

export interface IDocOfOptions<T = any> {
    statusCode: number;
    dto?: ClassConstructor<T>;
}

export interface IDocDefaultOptions<T = any> extends IDocOfOptions<T> {
    httpStatus: HttpStatus;
}

export interface IDocResponseOptions<T = any> {
    statusCode?: number;
    httpStatus?: HttpStatus;
    dto?: ClassConstructor<T>;
}

export interface IDocRequestOptions<T = any> {
    params?: ApiParamOptions[];
    queries?: ApiQueryOptions[];
    bodyType?: ENUM_DOC_REQUEST_BODY_TYPE;
    dto?: ClassConstructor<T>;
}