import { IDatabaseCreateManyOptions, IDatabaseFindAllOptions, IDatabaseGetTotalOptions, IDatabaseOptions } from "src/common/database/interfaces/database.interface";
import { RepositoryDoc } from "../repository/entities/repository.entity";
import { RepositoryListResponseDto } from "../dtos/response/repository.list.response.dto";
import { RepositoryGetResponseDto } from "../dtos/response/repository.get.response.dto";


export interface IRepositoryService {
    createMany(data: RepositoryDoc[], options?: IDatabaseCreateManyOptions): Promise<boolean>;
    getNewRepositories(repos: RepositoryDoc[]): Promise<RepositoryDoc[]>;
    getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>;
    findAll(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<RepositoryDoc[]>;
    mapList(repos: RepositoryDoc[]): Promise<RepositoryListResponseDto[]>;
    mapGet(repo: RepositoryDoc): Promise<RepositoryGetResponseDto>;
    findOneById(_id: string, options?: IDatabaseOptions): Promise<RepositoryDoc>;
}