import { Module } from "@nestjs/common";
import { RepositoryRepository } from "./repositories/repository.repository";
import { OwnerRepository } from "./repositories/owner.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { RepositoryEntity, RepositorySchema } from "./entities/repository.entity";
import { OwnerEntity, OwnerSchema } from "./entities/owner.entity";
import { DATABASE_CONNECTION_NAME } from "src/common/database/constants/database.constant";


@Module({
    providers: [RepositoryRepository, OwnerRepository],
    exports: [RepositoryRepository, OwnerRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: RepositoryEntity.name,
                    schema: RepositorySchema
                },
                {
                    name: OwnerEntity.name,
                    schema: OwnerSchema
                }
            ],
            DATABASE_CONNECTION_NAME
        )
    ]
})
export class GithubRepositoryModule {}