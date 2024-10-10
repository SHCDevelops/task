import { Module } from "@nestjs/common";
import { GithubRepositoryModule } from "./repository/github.repository.module";
import { GithubService } from "./services/github.service";
import { HttpModule } from "@nestjs/axios";


@Module({
    imports: [GithubRepositoryModule, HttpModule],
    providers: [GithubService],
    exports: [GithubService],
    controllers: []
})
export class GithubModule {}