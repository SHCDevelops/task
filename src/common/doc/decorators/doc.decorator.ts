import { applyDecorators, HttpStatus } from "@nestjs/common";
import { IDocDefaultOptions, IDocOptions, IDocRequestOptions, IDocResponseOptions } from "../interfaces/doc.interface";
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ResponseDto } from "src/common/response/dtos/response.dto";
import { ENUM_APP_STATUS_CODE_ERROR } from "src/app/constants/app.status-code.constant";
import { ENUM_REQUEST_STATUS_CODE_ERROR } from "src/common/request/constants/request.status-code.constant";
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from "src/common/pagination/enums/pagination.enum";
import { ResponsePagingDto } from "src/common/response/dtos/response.paging.dto";
import { ENUM_DOC_REQUEST_BODY_TYPE } from "../constants/doc.enum.constant";

export function DocDefault<T>(options: IDocDefaultOptions<T>): MethodDecorator {
    const docs = [];
    const schema: Record<string, any> = {
        allOf: [{ $ref: getSchemaPath(ResponseDto) }],
        properties: {
            statusCode: {
                type: 'number',
                example: options.statusCode,
            },
        },
    };

    if (options.dto) {
        docs.push(ApiExtraModels(options.dto as any));
        schema.properties = {
            ...schema.properties,
            data: {
                $ref: getSchemaPath(options.dto as any),
            },
        };
    }

    return applyDecorators(
        ApiExtraModels(ResponseDto),
        ApiResponse({
            description: options.httpStatus.toString(),
            status: options.httpStatus,
            schema,
        }),
        ...docs
    );
}

export function Doc(options?: IDocOptions): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: options?.summary,
            deprecated: options?.deprecated,
            description: options?.description,
            operationId: options?.operation,
        }),
        DocDefault({
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
        }),
        DocDefault({
            httpStatus: HttpStatus.REQUEST_TIMEOUT,
            statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.TIMEOUT_ERROR,
        })
    )
}

export function DocResponsePaging<T>(
    options: IDocResponseOptions<T>
): MethodDecorator {
    const docs: IDocDefaultOptions = {
        httpStatus: options?.httpStatus ?? HttpStatus.OK,
        statusCode: options?.statusCode ?? options?.httpStatus ?? HttpStatus.OK,
    };

    if (options?.dto) {
        docs.dto = options?.dto;
    }

    return applyDecorators(
        ApiProduces('application/json'),
        ApiQuery({
            name: 'search',
            required: false,
            allowEmptyValue: true,
            type: 'string',
            description:
                'Search will base on _metadata.pagination._availableSearch with rule contains, and case insensitive',
        }),
        ApiQuery({
            name: 'perPage',
            required: false,
            allowEmptyValue: true,
            example: 20,
            type: 'number',
            description: 'Data per page, max 100',
        }),
        ApiQuery({
            name: 'page',
            required: false,
            allowEmptyValue: true,
            example: 1,
            type: 'number',
            description: 'page number, max 20',
        }),
        ApiQuery({
            name: 'orderBy',
            required: false,
            allowEmptyValue: true,
            example: 'createdAt',
            type: 'string',
            description:
                'Order by base on _metadata.pagination.availableOrderBy',
        }),
        ApiQuery({
            name: 'orderDirection',
            required: false,
            allowEmptyValue: true,
            example: ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC,
            enum: ENUM_PAGINATION_ORDER_DIRECTION_TYPE,
            type: 'string',
            description:
                'Order direction base on _metadata.pagination.availableOrderDirection',
        }),
        ApiExtraModels(ResponsePagingDto),
        ApiExtraModels(options.dto as any),
        ApiResponse({
            description: docs.httpStatus.toString(),
            status: docs.httpStatus,
            schema: {
                allOf: [{ $ref: getSchemaPath(ResponsePagingDto) }],
                properties: {
                    statusCode: {
                        type: 'number',
                        example: docs.statusCode,
                    },
                    data: {
                        type: 'array',
                        items: {
                            $ref: getSchemaPath(docs.dto),
                        },
                    },
                },
            },
        })
    );
}

export function DocResponse<T = void>(
    options?: IDocResponseOptions<T>
): MethodDecorator {
    const docs: IDocDefaultOptions = {
        httpStatus: options?.httpStatus ?? HttpStatus.OK,
        statusCode: options?.statusCode ?? options?.httpStatus ?? HttpStatus.OK,
    };

    if (options?.dto) {
        docs.dto = options?.dto;
    }

    return applyDecorators(ApiProduces('application/json'), DocDefault(docs));
}

export function DocRequest(options?: IDocRequestOptions) {
    const docs: Array<ClassDecorator | MethodDecorator> = [];

    if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.FORM_DATA) {
        docs.push(ApiConsumes('multipart/form-data'));
    } else if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.TEXT) {
        docs.push(ApiConsumes('text/plain'));
    } else if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.JSON) {
        docs.push(ApiConsumes('application/json'));
    }

    if (options?.bodyType) {
        docs.push(
            DocDefault({
                httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
                statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.VALIDATION_ERROR,
            })
        );
    }

    if (options?.params) {
        const params: MethodDecorator[] = options?.params?.map(param =>
            ApiParam(param)
        );
        docs.push(...params);
    }

    if (options?.queries) {
        const queries: MethodDecorator[] = options?.queries?.map(query =>
            ApiQuery(query)
        );
        docs.push(...queries);
    }

    if (options?.dto) {
        docs.push(ApiBody({ type: options?.dto }));
    }

    return applyDecorators(...docs);
}