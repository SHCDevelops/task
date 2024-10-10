import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class ResponseMetadataDto {
    path: string;
    [key: string]: any;
}

export class ResponseDto {
    @ApiProperty({
        name: 'statusCode',
        type: 'number',
        required: true,
        nullable: false,
        description: 'return specific status code for every endpoints',
        example: 200,
    })
    statusCode: number;

    @ApiHideProperty()
    data?: Record<string, any>;

    @ApiProperty({
        name: '_metadata',
        required: true,
        nullable: false,
        description: 'Contain metadata about API',
        type: () => ResponseMetadataDto,
        example: {
            path: '/api/v1/test/hello',
        },
    })
    _metadata: ResponseMetadataDto;
}
