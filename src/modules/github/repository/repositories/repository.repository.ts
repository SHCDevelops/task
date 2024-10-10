import { Injectable } from "@nestjs/common";
import { DatabaseRepositoryAbstract } from "src/common/database/abstracts/database.repository.abstract";
import { RepositoryDoc, RepositoryEntity } from "../entities/repository.entity";
import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Model } from "mongoose";
import { OwnerEntity } from "../entities/owner.entity";

@Injectable()
export class RepositoryRepository extends DatabaseRepositoryAbstract<
    RepositoryEntity,
    RepositoryDoc
> {
    constructor(
        @DatabaseModel(RepositoryEntity.name)
        private readonly repositoryModel: Model<RepositoryEntity>
    ) {
        super(repositoryModel, [
            {
                path: 'owner',
                localField: 'owner',
                foreignField: 'id',
                model: OwnerEntity.name,
                justOne: true
            }
        ])
    }
}