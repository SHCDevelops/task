import { IDatabaseCreateManyOptions } from "src/common/database/interfaces/database.interface";
import { RepositoryDoc } from "../repository/entities/repository.entity";


export interface IRepositoryService {
    createMany(data: RepositoryDoc[], options?: IDatabaseCreateManyOptions): Promise<boolean>;
    getNewRepositories(repos: RepositoryDoc[]): Promise<RepositoryDoc[]>;
}