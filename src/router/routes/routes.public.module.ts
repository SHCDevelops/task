import { Module } from "@nestjs/common";
import { GithubModule } from "src/module/github/github.module";


@Module({
    controllers: [],
    providers: [],
    exports: [],
    imports: [GithubModule]
})
export class RoutesPublicModule {}