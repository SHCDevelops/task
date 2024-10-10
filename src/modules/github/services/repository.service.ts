import { Injectable } from "@nestjs/common";
import { IRepositoryService } from "../interfaces/repository.service.interface";
import { RepositoryRepository } from "../repository/repositories/repository.repository";
import { RepositoryDoc, RepositoryEntity } from "../repository/entities/repository.entity";
import { IDatabaseCreateManyOptions, IDatabaseFindAllOptions, IDatabaseGetTotalOptions, IDatabaseOptions } from "src/common/database/interfaces/database.interface";
import { RepositoryListResponseDto } from "../dtos/response/repository.list.response.dto";
import { plainToInstance } from "class-transformer";
import { RepositoryGetResponseDto } from "../dtos/response/repository.get.response.dto";


@Injectable()
export class RepositoryService implements IRepositoryService {
    
    constructor(
        private readonly repositoryRepository: RepositoryRepository,
    ) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<RepositoryDoc[]> {
        return this.repositoryRepository.findAll<RepositoryDoc>(find, options);
    }

    async createMany(data: RepositoryDoc[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
        try {
            const create: RepositoryEntity[] = data.map(
                (owner) => { return owner }
            ) as RepositoryEntity[];

            await this.repositoryRepository.createMany<RepositoryEntity>(create, options);
            
            return true;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getNewRepositories(repos: RepositoryDoc[]): Promise<RepositoryDoc[]> {
        const repoIds = repos.map(repo => repo.id);
        const existingRepos = await this.repositoryRepository.findAll({
            id: { $in: repoIds },
        });
        const existingRepoIds = new Set(existingRepos.map(repo => repo.id));
        return repos.filter(repo => !existingRepoIds.has(repo.id));
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.repositoryRepository.getTotal(find, options);
    }

    async mapList(repos: RepositoryDoc[]): Promise<RepositoryListResponseDto[]> {
        const plainObject: RepositoryEntity[] = repos.map(e => e.toObject());

        return plainToInstance(RepositoryListResponseDto, plainObject);
    }

    async mapGet(repo: RepositoryDoc): Promise<RepositoryGetResponseDto> {
        return plainToInstance(RepositoryGetResponseDto, repo.toObject());
    }

    async findOneById(
        _id: string,
        options?: IDatabaseOptions
    ): Promise<RepositoryDoc> {
        return this.repositoryRepository.findOneById<RepositoryDoc>(_id, options);
    }
}