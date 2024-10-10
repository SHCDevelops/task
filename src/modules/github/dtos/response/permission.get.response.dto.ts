import { ApiProperty } from '@nestjs/swagger';

export class PermissionsGetResponseDto {
    @ApiProperty({
        description: 'Флаг администратора',
        example: true,
        required: true,
    })
    readonly admin: boolean;

    @ApiProperty({
        description: 'Флаг поддержки',
        example: false,
        required: false,
    })
    readonly maintain?: boolean;

    @ApiProperty({
        description: 'Флаг push-доступа',
        example: true,
        required: true,
    })
    readonly push: boolean;

    @ApiProperty({
        description: 'Флаг триажа',
        example: false,
        required: false,
    })
    readonly triage?: boolean;

    @ApiProperty({
        description: 'Флаг pull-доступа',
        example: true,
        required: true,
    })
    readonly pull: boolean;
}