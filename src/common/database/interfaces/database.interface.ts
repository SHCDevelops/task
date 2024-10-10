import { ClientSession, PopulateOptions } from 'mongoose';

export type IDatabaseDocument<T> = T & Document;

// Find
export interface IDatabaseOptions {
    select?: Record<string, boolean | number> | string;
    join?: boolean | PopulateOptions | PopulateOptions[];
    session?: ClientSession;
}

export type IDatabaseCreateOptions = Pick<IDatabaseOptions, 'session'>;
export type IDatabaseCreateManyOptions = Pick<IDatabaseOptions, 'session'>;

export interface IDatabaseFindAllOptions extends IDatabaseOptions {
    // TODO: Pagination
}