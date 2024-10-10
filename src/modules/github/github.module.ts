import { Module } from "@nestjs/common";
import { GithubRepositoryModule } from "./repository/github.repository.module";
import { GithubService } from "./services/github.service";
import { HttpModule } from "@nestjs/axios";
import { OwnerService } from "./services/owner.service";
import { RepositoryService } from "./services/repository.service";


@Module({
    imports: [GithubRepositoryModule, HttpModule],
    providers: [GithubService, OwnerService, RepositoryService],
    exports: [GithubService, OwnerService, RepositoryService],
    controllers: []
})
export class GithubModule {}