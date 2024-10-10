import { IDatabaseCreateManyOptions, IDatabaseCreateOptions, IDatabaseDocument, IDatabaseFindAllOptions, IDatabaseOptions } from "../interfaces/database.interface";
import { DatabaseEntityAbstract } from "./database.entity.abstract";
import { Model, PopulateOptions } from 'mongoose';
import MongoDB from 'mongodb';

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

    async findAll<T = EntityDocument>(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<T[]> {
        const repository = this._repository.find<T>(
            find
        );

        if (options?.select) {
            repository.select(options.select);
        }

        // TODO: Pagination

        if (options?.join) {
            repository.populate(
                (typeof options.join === 'boolean' && options.join
                    ? this._join
                    : options.join) as
                    | PopulateOptions
                    | (string | PopulateOptions)[]
            );
        }

        if (options?.session) {
            repository.session(options.session);
        }

        const results = await repository.exec();

        return results;
    }

    async findOne<T = EntityDocument>(
        find: Record<string, any>,
        options?: IDatabaseOptions
    ): Promise<T> {
        const repository = this._repository.findOne<T>(
            find
        );

        if (options?.select) {
            repository.select(options.select);
        }

        if (options?.join) {
            repository.populate(
                (typeof options.join === 'boolean' && options.join
                    ? this._join
                    : options.join) as
                    | PopulateOptions
                    | (string | PopulateOptions)[]
            );
        }

        if (options?.session) {
            repository.session(options.session);
        }

        const result = await repository.exec();

        return result;
    }

    async findOneById<T = EntityDocument>(
        _id: string,
        options?: IDatabaseOptions
    ): Promise<T> {
        const repository = this._repository.findOne<T>({
            _id
        });

        if (options?.select) {
            repository.select(options.select);
        }

        if (options?.join) {
            repository.populate(
                (typeof options.join === 'boolean' && options.join
                    ? this._join
                    : options.join) as
                    | PopulateOptions
                    | (string | PopulateOptions)[]
            );
        }

        if (options?.session) {
            repository.session(options.session);
        }

        const result = await repository.exec();

        return result;
    }

    async create<T extends DatabaseEntityAbstract>(
        data: T,
        options?: IDatabaseCreateOptions
    ): Promise<EntityDocument> {
        const created = await this._repository.create([data], options);

        return created[0] as any;
    }

    async createMany<T extends Entity>(
        data: T[],
        options?: IDatabaseCreateManyOptions
    ): Promise<MongoDB.InsertManyResult> {
        return this._repository.insertMany(data, {
            ...options,
            rawResult: true,
        });
    }

    async model(): Promise<Model<Entity>> {
        return this._repository;
    }
}