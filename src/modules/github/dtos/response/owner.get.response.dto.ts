import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class OwnerGetResponseDto {
    @ApiProperty({
        description: 'Имя владельца',
        example: 'octocat',
        required: false,
        nullable: true,
    })
    readonly name?: string | null;

    @ApiProperty({
        description: 'Email владельца',
        example: 'octocat@github.com',
        required: false,
        nullable: true,
    })
    readonly email?: string | null;

    @ApiProperty({
        description: 'Логин владельца',
        example: 'octocat',
        required: true,
    })
    readonly login: string;

    @ApiProperty({
        description: 'Идентификатор владельца',
        example: 1,
        required: true,
    })
    readonly id: number;

    @ApiProperty({
        description: 'Node ID владельца',
        example: 'MDQ6VXNlcjE=',
        required: true,
    })
    readonly node_id: string;

    @ApiProperty({
        description: 'URL аватарки',
        example: 'https://github.com/images/error/octocat_happy.gif',
        required: true,
    })
    readonly avatar_url: string;

    @ApiProperty({
        description: 'Gravatar ID',
        example: '41d064eb2195891e12d0413f63227ea7',
        required: false,
        nullable: true,
    })
    readonly gravatar_id?: string | null;

    @ApiProperty({
        description: 'API URL пользователя',
        example: 'https://api.github.com/users/octocat',
        required: true,
    })
    readonly url: string;

    @ApiProperty({
        description: 'HTML URL пользователя',
        example: 'https://github.com/octocat',
        required: true,
    })
    readonly html_url: string;

    @ApiProperty({
        description: 'URL подписчиков',
        example: 'https://api.github.com/users/octocat/followers',
        required: true,
    })
    readonly followers_url: string;

    @ApiProperty({
        description: 'URL подписок',
        example: 'https://api.github.com/users/octocat/following{/other_user}',
        required: true,
    })
    readonly following_url: string;

    @ApiProperty({
        description: 'URL Gists',
        example: 'https://api.github.com/users/octocat/gists{/gist_id}',
        required: true,
    })
    readonly gists_url: string;

    @ApiProperty({
        description: 'URL звезд',
        example: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
        required: true,
    })
    readonly starred_url: string;

    @ApiProperty({
        description: 'URL подписок',
        example: 'https://api.github.com/users/octocat/subscriptions',
        required: true,
    })
    readonly subscriptions_url: string;

    @ApiProperty({
        description: 'URL организаций',
        example: 'https://api.github.com/users/octocat/orgs',
        required: true,
    })
    readonly organizations_url: string;

    @ApiProperty({
        description: 'URL репозиториев',
        example: 'https://api.github.com/users/octocat/repos',
        required: true,
    })
    readonly repos_url: string;

    @ApiProperty({
        description: 'URL событий',
        example: 'https://api.github.com/users/octocat/events{/privacy}',
        required: true,
    })
    readonly events_url: string;

    @ApiProperty({
        description: 'URL полученных событий',
        example: 'https://api.github.com/users/octocat/received_events',
        required: true,
    })
    readonly received_events_url: string;

    @ApiProperty({
        description: 'Тип владельца',
        example: 'User',
        required: true,
    })
    readonly type: string;

    @ApiProperty({
        description: 'Флаг администрирования сайта',
        example: false,
        required: true,
    })
    readonly site_admin: boolean;

    @ApiProperty({
        description: 'Дата звездования',
        example: '2020-07-09T00:17:55Z',
        required: false,
        nullable: true,
    })
    readonly starred_at?: string | null;
}