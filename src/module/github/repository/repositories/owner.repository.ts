import { DatabaseRepositoryAbstract } from "src/common/database/abstracts/database.repository.abstract";
import { OwnerDoc, OwnerEntity } from "../entities/owner.entity";
import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Model } from "mongoose";

export class OwnerRepository extends DatabaseRepositoryAbstract<
    OwnerEntity,
    OwnerDoc
> {
    constructor(
        @DatabaseModel(OwnerEntity.name)
        private readonly OwnerModel: Model<OwnerEntity>
    ) {
        super(OwnerModel)
    }
}