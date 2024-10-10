import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GithubPublicGetDoc, GithubPublicListDoc } from "../docs/github.public.doc";
import { Response, ResponsePaging } from "src/common/response/decorators/response.decorator";
import { PaginationQuery } from "src/common/pagination/decorators/pagination.decorator";
import { GITHUB_DEFAULT_AVAILABLE_SEARCH } from "../constants/github.list.constant";
import { PaginationListDto } from "src/common/pagination/dtos/pagination.list.dto";
import { IResponse, IResponsePaging } from "src/common/response/interfaces/response.interface";
import { RepositoryListResponseDto } from "../dtos/response/repository.list.response.dto";
import { RepositoryService } from "../services/repository.service";
import { PaginationService } from "src/common/pagination/services/pagination.service";
import { RepositoryDoc } from "../repository/entities/repository.entity";
import { RequestRequiredPipe } from "src/common/request/pipes/request.required.pipe";
import { RepositoryParsePipe } from "../pipes/repository.parse.pipe";
import { RepositoryGetResponseDto } from "../dtos/response/repository.get.response.dto";


@ApiTags('modules.public.github')
@Controller({
    version: '1',
    path: '/github'
})
export class GithubPubliController {
    constructor(
        private readonly repositoryService: RepositoryService,
        private readonly paginationService: PaginationService
    ) {}

    @GithubPublicGetDoc()
    @Response()
    @Get('repo/:repo')
    async get(
        @Param('repo', RequestRequiredPipe, RepositoryParsePipe) repo: RepositoryDoc
    ): Promise<IResponse<RepositoryGetResponseDto>> {
        const mapRepo: RepositoryGetResponseDto =
            await this.repositoryService.mapGet(repo);

        return { data: mapRepo };
    }

    @GithubPublicListDoc()
    @ResponsePaging()
    @Get('/list')
    async list(
        @PaginationQuery({ availableSearch: GITHUB_DEFAULT_AVAILABLE_SEARCH })
        { _search, _limit, _offset, _order }: PaginationListDto,
    ): Promise<IResponsePaging<RepositoryListResponseDto>> {
        const find: Record<string, any> = {
            ..._search,
        };

        const repositories: RepositoryDoc[] = await this.repositoryService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
            join: true,
        })

        const total: number = await this.repositoryService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        const mapRepos: RepositoryListResponseDto[] =
            await this.repositoryService.mapList(repositories);

        return {
            _pagination: {total, totalPage},
            data: mapRepos
        }

    }
}