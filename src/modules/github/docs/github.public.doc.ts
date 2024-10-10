import { applyDecorators } from "@nestjs/common";
import { Doc, DocRequest, DocResponse, DocResponsePaging } from "src/common/doc/decorators/doc.decorator";
import { RepositoryListResponseDto } from "../dtos/response/repository.list.response.dto";
import { RepositoryGetResponseDto } from "../dtos/response/repository.get.response.dto";
import { GithubDocParamsId } from "../constants/github.doc.constant";


export function GithubPublicListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            summary: 'get all repositories'
        }),
        DocResponsePaging<RepositoryListResponseDto>({
            dto: RepositoryListResponseDto
        })
    )
}

export function GithubPublicGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            summary: 'get repository'
        }),
        DocRequest({
            params: GithubDocParamsId
        }),
        DocResponse<RepositoryGetResponseDto>({
            dto: RepositoryGetResponseDto
        })
    )
}