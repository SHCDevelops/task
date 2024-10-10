import { Injectable } from "@nestjs/common";
import { IOwnerSerivce } from "../interfaces/owner.service.interface";
import { OwnerRepository } from "../repository/repositories/owner.repository";
import { IDatabaseCreateManyOptions, IDatabaseFindAllOptions, IDatabaseOptions } from "src/common/database/interfaces/database.interface";
import { OwnerDoc, OwnerEntity } from "../repository/entities/owner.entity";
import { DatabaseQueryIn } from "src/common/database/decorators/database.decorator";


@Injectable()
export class OwnerService implements IOwnerSerivce {

    constructor(
        private readonly ownerRepository: OwnerRepository,
    ) {}

    async findOne(find: Record<string, any>, options?: IDatabaseOptions): Promise<OwnerDoc> {
        return this.ownerRepository.findOne(find, options);
    }

    async createMany(data: OwnerDoc[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
        try {
            const create: OwnerEntity[] = data.map(
                (owner) => { return owner }
            ) as OwnerEntity[];

            await this.ownerRepository.createMany<OwnerEntity>(create, options);
            
            return true;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getNewOwners(repos: OwnerDoc[]): Promise<OwnerDoc[]> {
        const repoIds = repos.map(repo => repo.id);
        const existingRepos = await this.ownerRepository.findAll({
            id: {
                $in: repoIds
            },
        });
        const existingRepoIds = new Set(existingRepos.map(repo => repo.id));
        return repos.filter(repo => !existingRepoIds.has(repo.id));
    }

    async getOwnersByIds(ownerIds: number[], options?: IDatabaseFindAllOptions): Promise<OwnerDoc[]> {
        return this.ownerRepository.findAll({
            id: {
                $in: ownerIds 
            },
        }, options);
    }

}