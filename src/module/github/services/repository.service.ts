import { Injectable } from "@nestjs/common";
import { IRepositoryService } from "../interfaces/repository.service.interface";
import { RepositoryRepository } from "../repository/repositories/repository.repository";
import { RepositoryDoc, RepositoryEntity } from "../repository/entities/repository.entity";
import { IDatabaseCreateManyOptions } from "src/common/database/interfaces/database.interface";


@Injectable()
export class RepositoryService implements IRepositoryService {
    
    constructor(
        private readonly repositoryRepository: RepositoryRepository,
    ) {}

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
}