import { IDatabaseCreateManyOptions, IDatabaseFindAllOptions, IDatabaseOptions } from "src/common/database/interfaces/database.interface";
import { OwnerDoc } from "../repository/entities/owner.entity";


export interface IOwnerSerivce {
    findOne(find: Record<string, any>, options?: IDatabaseOptions): Promise<OwnerDoc>;
    getNewOwners(repos: OwnerDoc[], options?: IDatabaseFindAllOptions): Promise<OwnerDoc[]>;
    getOwnersByIds(ownerIds: number[], options?: IDatabaseFindAllOptions): Promise<OwnerDoc[]>;
    createMany(data: OwnerDoc[], options?: IDatabaseCreateManyOptions): Promise<boolean>;
}