import { ApiProperty } from '@nestjs/swagger';

export class LicenseGetResponseDto {
    @ApiProperty({
        description: 'Ключ лицензии',
        example: 'mit',
        required: true,
    })
    readonly key: string;

    @ApiProperty({
        description: 'Название лицензии',
        example: 'MIT License',
        required: true,
    })
    readonly name: string;

    @ApiProperty({
        description: 'URL лицензии',
        example: 'https://api.github.com/licenses/mit',
        required: false,
        nullable: true,
    })
    readonly url?: string | null;

    @ApiProperty({
        description: 'SPDX ID лицензии',
        example: 'MIT',
        required: false,
        nullable: true,
    })
    readonly spdx_id?: string | null;

    @ApiProperty({
        description: 'Node ID лицензии',
        example: 'MDc6TGljZW5zZW1pdA==',
        required: true,
    })
    readonly node_id: string;

    @ApiProperty({
        description: 'HTML URL лицензии',
        example: 'https://github.com/licenses/mit',
        required: false,
        nullable: true,
    })
    readonly html_url?: string | null;
}