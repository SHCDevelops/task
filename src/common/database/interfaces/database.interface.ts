import { ClientSession, Document, PopulateOptions } from 'mongoose';
import { IPaginationOrder } from 'src/common/pagination/interfaces/pagination.interface';

export type IDatabaseDocument<T> = T & Document;

// Find
export interface IDatabaseOptions {
    select?: Record<string, boolean | number> | string;
    join?: boolean | PopulateOptions | PopulateOptions[];
    session?: ClientSession;
}

export interface IDatabaseFindAllPagingOptions {
    limit: number;
    offset: number;
}

export interface IDatabaseFindAllOptions extends IDatabaseOptions {
    paging: IDatabaseFindAllPagingOptions;
    order: IPaginationOrder;
}

export type IDatabaseGetTotalOptions = Omit<IDatabaseOptions, 'select'>;

export type IDatabaseCreateOptions = Pick<IDatabaseOptions, 'session'>;
export type IDatabaseCreateManyOptions = Pick<IDatabaseOptions, 'session'>;

export interface IDatabaseQueryContainOptions {
    fullWord: boolean;
}