import { IDatabaseDocument } from "../interfaces/database.interface";
import { DatabaseEntityAbstract } from "./database.entity.abstract";
import { Model, PopulateOptions } from 'mongoose';

export abstract class DatabaseRepositoryAbstract<
    Entity extends DatabaseEntityAbstract,
    EntityDocument extends IDatabaseDocument<Entity>,
> {
    protected readonly _repository: Model<Entity>;
    readonly _join?: PopulateOptions | (string | PopulateOptions)[];

    constructor(
        repository: Model<Entity>,
        options?: PopulateOptions | (string | PopulateOptions)[]
    ) {
        this._repository = repository;
        this._join = options;
    }

    async model(): Promise<Model<Entity>> {
        return this._repository;
    }
}