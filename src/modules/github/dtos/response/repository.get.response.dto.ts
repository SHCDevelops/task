import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { OwnerGetResponseDto } from './owner.get.response.dto';
import { LicenseGetResponseDto } from './license.get.response.dto';
import { PermissionsGetResponseDto } from './permission.get.response.dto';

export class RepositoryGetResponseDto {
    @ApiProperty({
        description: 'Идентификатор репозитория',
        example: 1,
        required: true,
    })
    readonly id: number;

    @ApiProperty({
        description: 'Node ID репозитория',
        example: 'MDQ6VXNlcjE=',
        required: true,
    })
    readonly node_id: string;

    @ApiProperty({
        description: 'Название репозитория',
        example: 'octocat/Hello-World',
        required: true,
    })
    readonly name: string;

    @ApiProperty({
        description: 'Полное имя репозитория',
        example: 'octocat/Hello-World',
        required: true,
    })
    readonly full_name: string;

    @ApiProperty({
        type: OwnerGetResponseDto,
        description: 'Информация о владельце репозитория',
        required: true,
    })
    @Type(() => OwnerGetResponseDto)
    readonly owner: OwnerGetResponseDto | null;

    @ApiProperty({
        description: 'Публичный флаг репозитория',
        example: false,
        required: true,
    })
    readonly private: boolean;

    @ApiProperty({
        description: 'URL HTML страницы репозитория',
        example: 'https://github.com/octocat/Hello-World',
        required: true,
    })
    readonly html_url: string;

    @ApiProperty({
        description: 'Описание репозитория',
        example: 'This your first repo!',
        required: false,
        nullable: true,
    })
    readonly description?: string | null;

    @ApiProperty({
        description: 'Флаг форка',
        example: false,
        required: true,
    })
    readonly fork: boolean;

    @ApiProperty({
        description: 'API URL репозитория',
        example: 'https://api.github.com/repos/octocat/Hello-World',
        required: true,
    })
    readonly url: string;

    @ApiProperty({
        description: 'Дата создания репозитория',
        example: '2011-01-26T19:01:12Z',
        required: true,
        type: String,
    })
    readonly created_at: string;

    @ApiProperty({
        description: 'Дата последнего обновления репозитория',
        example: '2021-04-14T16:20:00Z',
        required: true,
        type: String,
    })
    readonly updated_at: string;

    @ApiProperty({
        description: 'Дата последнего пуша в репозиторий',
        example: '2021-04-14T16:20:00Z',
        required: true,
        type: String,
    })
    readonly pushed_at: string;

    @ApiProperty({
        description: 'URL домашней страницы репозитория',
        example: 'https://github.com',
        required: false,
        nullable: true,
    })
    readonly homepage?: string | null;

    @ApiProperty({
        description: 'Размер репозитория',
        example: 108,
        required: true,
    })
    readonly size: number;

    @ApiProperty({
        description: 'Количество звезд',
        example: 80,
        required: true,
    })
    readonly stargazers_count: number;

    @ApiProperty({
        description: 'Количество наблюдателей',
        example: 80,
        required: true,
    })
    readonly watchers_count: number;

    @ApiProperty({
        description: 'Основной язык программирования',
        example: 'JavaScript',
        required: false,
        nullable: true,
    })
    readonly language?: string | null;

    @ApiProperty({
        description: 'Количество форков',
        example: 9,
        required: true,
    })
    readonly forks_count: number;

    @ApiProperty({
        description: 'Количество открытых задач',
        example: 0,
        required: true,
    })
    readonly open_issues_count: number;

    @ApiProperty({
        description: 'Основная ветка',
        example: 'main',
        required: true,
    })
    readonly default_branch: string;

    @ApiProperty({
        description: 'Рейтинг репозитория',
        example: 1.0,
        required: true,
    })
    readonly score: number;

    @ApiProperty({
        description: 'URL форков',
        example: 'https://api.github.com/repos/octocat/Hello-World/forks',
        required: true,
    })
    readonly forks_url: string;

    @ApiProperty({
        description: 'URL ключей',
        example: 'https://api.github.com/repos/octocat/Hello-World/keys{/key_id}',
        required: true,
    })
    readonly keys_url: string;

    @ApiProperty({
        description: 'URL коллабораторов',
        example: 'https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}',
        required: true,
    })
    readonly collaborators_url: string;

    @ApiProperty({
        description: 'URL команд',
        example: 'https://api.github.com/repos/octocat/Hello-World/teams',
        required: true,
    })
    readonly teams_url: string;

    @ApiProperty({
        description: 'URL хуков',
        example: 'https://api.github.com/repos/octocat/Hello-World/hooks',
        required: true,
    })
    readonly hooks_url: string;

    @ApiProperty({
        description: 'URL событий задач',
        example: 'https://api.github.com/repos/octocat/Hello-World/issues/events{/number}',
        required: true,
    })
    readonly issue_events_url: string;

    @ApiProperty({
        description: 'URL событий репозитория',
        example: 'https://api.github.com/repos/octocat/Hello-World/events',
        required: true,
    })
    readonly events_url: string;

    @ApiProperty({
        description: 'URL назначений',
        example: 'https://api.github.com/repos/octocat/Hello-World/assignees{/user}',
        required: true,
    })
    readonly assignees_url: string;

    @ApiProperty({
        description: 'URL веток',
        example: 'https://api.github.com/repos/octocat/Hello-World/branches{/branch}',
        required: true,
    })
    readonly branches_url: string;

    @ApiProperty({
        description: 'URL тегов',
        example: 'https://api.github.com/repos/octocat/Hello-World/tags',
        required: true,
    })
    readonly tags_url: string;

    @ApiProperty({
        description: 'URL BLOBs',
        example: 'https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}',
        required: true,
    })
    readonly blobs_url: string;

    @ApiProperty({
        description: 'URL Git тегов',
        example: 'https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}',
        required: true,
    })
    readonly git_tags_url: string;

    @ApiProperty({
        description: 'URL Git ссылок',
        example: 'https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}',
        required: true,
    })
    readonly git_refs_url: string;

    @ApiProperty({
        description: 'URL деревьев',
        example: 'https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}',
        required: true,
    })
    readonly trees_url: string;

    @ApiProperty({
        description: 'URL статусов',
        example: 'https://api.github.com/repos/octocat/Hello-World/statuses/{sha}',
        required: true,
    })
    readonly statuses_url: string;

    @ApiProperty({
        description: 'URL языков',
        example: 'https://api.github.com/repos/octocat/Hello-World/languages',
        required: true,
    })
    readonly languages_url: string;

    @ApiProperty({
        description: 'URL Stargazers',
        example: 'https://api.github.com/repos/octocat/Hello-World/stargazers',
        required: true,
    })
    readonly stargazers_url: string;

    @ApiProperty({
        description: 'URL контрибьюторов',
        example: 'https://api.github.com/repos/octocat/Hello-World/contributors',
        required: true,
    })
    readonly contributors_url: string;

    @ApiProperty({
        description: 'URL подписчиков',
        example: 'https://api.github.com/repos/octocat/Hello-World/subscribers',
        required: true,
    })
    readonly subscribers_url: string;

    @ApiProperty({
        description: 'URL подписки',
        example: 'https://api.github.com/repos/octocat/Hello-World/subscription',
        required: true,
    })
    readonly subscription_url: string;

    @ApiProperty({
        description: 'URL коммитов',
        example: 'https://api.github.com/repos/octocat/Hello-World/commits{/sha}',
        required: true,
    })
    readonly commits_url: string;

    @ApiProperty({
        description: 'URL git коммитов',
        example: 'https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}',
        required: true,
    })
    readonly git_commits_url: string;

    @ApiProperty({
        description: 'URL комментариев',
        example: 'https://api.github.com/repos/octocat/Hello-World/comments{/number}',
        required: true,
    })
    readonly comments_url: string;

    @ApiProperty({
        description: 'URL комментариев задач',
        example: 'https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}',
        required: true,
    })
    readonly issue_comment_url: string;

    @ApiProperty({
        description: 'URL содержимого',
        example: 'https://api.github.com/repos/octocat/Hello-World/contents/{+path}',
        required: true,
    })
    readonly contents_url: string;

    @ApiProperty({
        description: 'URL сравнения',
        example: 'https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}',
        required: true,
    })
    readonly compare_url: string;

    @ApiProperty({
        description: 'URL слияний',
        example: 'https://api.github.com/repos/octocat/Hello-World/merges',
        required: true,
    })
    readonly merges_url: string;

    @ApiProperty({
        description: 'URL архивации',
        example: 'https://api.github.com/repos/octocat/Hello-World/archive/{archive_format}{/ref}',
        required: true,
    })
    readonly archive_url: string;

    @ApiProperty({
        description: 'URL загрузок',
        example: 'https://api.github.com/repos/octocat/Hello-World/downloads',
        required: true,
    })
    readonly downloads_url: string;

    @ApiProperty({
        description: 'URL задач',
        example: 'https://api.github.com/repos/octocat/Hello-World/issues{/number}',
        required: true,
    })
    readonly issues_url: string;

    @ApiProperty({
        description: 'URL пулл-запросов',
        example: 'https://api.github.com/repos/octocat/Hello-World/pulls{/number}',
        required: true,
    })
    readonly pulls_url: string;

    @ApiProperty({
        description: 'URL вех',
        example: 'https://api.github.com/repos/octocat/Hello-World/milestones{/number}',
        required: true,
    })
    readonly milestones_url: string;

    @ApiProperty({
        description: 'URL уведомлений',
        example: 'https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}',
        required: true,
    })
    readonly notifications_url: string;

    @ApiProperty({
        description: 'URL меток',
        example: 'https://api.github.com/repos/octocat/Hello-World/labels{/name}',
        required: true,
    })
    readonly labels_url: string;

    @ApiProperty({
        description: 'URL релизов',
        example: 'https://api.github.com/repos/octocat/Hello-World/releases{/id}',
        required: true,
    })
    readonly releases_url: string;

    @ApiProperty({
        description: 'URL деплоев',
        example: 'https://api.github.com/repos/octocat/Hello-World/deployments',
        required: true,
    })
    readonly deployments_url: string;

    @ApiProperty({
        description: 'Git URL',
        example: 'git://github.com/octocat/Hello-World.git',
        required: true,
    })
    readonly git_url: string;

    @ApiProperty({
        description: 'SSH URL',
        example: 'git@github.com:octocat/Hello-World.git',
        required: true,
    })
    readonly ssh_url: string;

    @ApiProperty({
        description: 'Клонируемый URL',
        example: 'https://github.com/octocat/Hello-World.git',
        required: true,
    })
    readonly clone_url: string;

    @ApiProperty({
        description: 'SVN URL',
        example: 'https://svn.github.com/octocat/Hello-World',
        required: true,
    })
    readonly svn_url: string;

    @ApiProperty({
        description: 'Количество форков',
        example: 9,
        required: true,
    })
    readonly forks: number;

    @ApiProperty({
        description: 'Количество открытых задач',
        example: 0,
        required: true,
    })
    readonly open_issues: number;

    @ApiProperty({
        description: 'Количество наблюдателей',
        example: 80,
        required: true,
    })
    readonly watchers: number;

    @ApiProperty({
        description: 'Список тем',
        example: ['nestjs', 'typescript'],
        required: true,
        type: [String],
    })
    readonly topics: string[];

    @ApiProperty({
        description: 'URL зеркала',
        example: 'https://mirror.github.com/octocat/Hello-World',
        required: false,
        nullable: true,
    })
    readonly mirror_url?: string | null;

    @ApiProperty({
        description: 'Флаг наличия задач',
        example: true,
        required: true,
    })
    readonly has_issues: boolean;

    @ApiProperty({
        description: 'Флаг наличия проектов',
        example: true,
        required: true,
    })
    readonly has_projects: boolean;

    @ApiProperty({
        description: 'Флаг наличия страниц',
        example: true,
        required: true,
    })
    readonly has_pages: boolean;

    @ApiProperty({
        description: 'Флаг наличия вики',
        example: true,
        required: true,
    })
    readonly has_wiki: boolean;

    @ApiProperty({
        description: 'Флаг наличия загрузок',
        example: true,
        required: true,
    })
    readonly has_downloads: boolean;

    @ApiProperty({
        description: 'Флаг наличия обсуждений',
        example: true,
        required: true,
    })
    readonly has_discussions: boolean;

    @ApiProperty({
        description: 'Флаг архивирования репозитория',
        example: false,
        required: true,
    })
    readonly archived: boolean;

    @ApiProperty({
        description: 'Флаг отключения репозитория',
        example: false,
        required: true,
    })
    readonly disabled: boolean;

    @ApiProperty({
        description: 'Видимость репозитория',
        example: 'public',
        required: true,
    })
    readonly visibility: string;

    @ApiProperty({
        type: LicenseGetResponseDto,
        description: 'Информация о лицензии',
        required: false,
        nullable: true,
    })
    @Type(() => LicenseGetResponseDto)
    readonly license?: LicenseGetResponseDto | null;

    @ApiProperty({
        type: PermissionsGetResponseDto,
        description: 'Права доступа',
        required: false,
    })
    @Type(() => PermissionsGetResponseDto)
    readonly permissions?: PermissionsGetResponseDto;

    @ApiProperty({
        description: 'Токен временного клонирования',
        example: 'temporary_token',
        required: false,
    })
    readonly temp_clone_token?: string;

    @ApiProperty({
        description: 'Разрешение на слияние коммитов',
        example: true,
        required: false,
    })
    readonly allow_merge_commit?: boolean;

    @ApiProperty({
        description: 'Разрешение на слияние через squash',
        example: true,
        required: false,
    })
    readonly allow_squash_merge?: boolean;

    @ApiProperty({
        description: 'Разрешение на слияние через rebase',
        example: true,
        required: false,
    })
    readonly allow_rebase_merge?: boolean;

    @ApiProperty({
        description: 'Разрешение на авто-слияние',
        example: true,
        required: false,
    })
    readonly allow_auto_merge?: boolean;

    @ApiProperty({
        description: 'Удалять ветку после слияния',
        example: true,
        required: false,
    })
    readonly delete_branch_on_merge?: boolean;

    @ApiProperty({
        description: 'Разрешение на форкинг',
        example: true,
        required: true,
    })
    readonly allow_forking: boolean;

    @ApiProperty({
        description: 'Флаг шаблона репозитория',
        example: false,
        required: true,
    })
    readonly is_template: boolean;

    @ApiProperty({
        description: 'Требуется ли подпись коммитов',
        example: false,
        required: true,
    })
    readonly web_commit_signoff_required: boolean;

    @ApiHideProperty()
    @Exclude()
    readonly starred_at?: string | null;
}