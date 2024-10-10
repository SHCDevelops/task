import { Module } from "@nestjs/common";
import { PaginationModule } from "src/common/pagination/pagination.module";
import { GithubPubliController } from "src/modules/github/controllers/github.public.controller";
import { GithubModule } from "src/modules/github/github.module";


@Module({
    controllers: [GithubPubliController],
    providers: [],
    exports: [],
    imports: [GithubModule, PaginationModule]
})
export class RoutesPublicModule {}