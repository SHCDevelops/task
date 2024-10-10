import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { IGithubService } from "../interfaces/github.service.interface";
import { interval, Observable, Subscription, switchMap } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { RepositoryDoc } from "../repository/entities/repository.entity";
import { OwnerDoc } from "../repository/entities/owner.entity";
import { RepositoryRepository } from "../repository/repositories/repository.repository";
import { OwnerRepository } from "../repository/repositories/owner.repository";
import { OwnerService } from "./owner.service";
import { RepositoryService } from "./repository.service";


@Injectable()
export class GithubService implements IGithubService, OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(GithubService.name);
    private intervalSubscription: Subscription;
    private FETCH_INTERVAL_MINUTES: number;
    private GITHUB_API_URL: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly ownerService: OwnerService,
        private readonly repositoryService: RepositoryService
    ) {
        this.FETCH_INTERVAL_MINUTES = this.configService.get<number>('github.interval');
        this.GITHUB_API_URL = this.configService.get<string>('github.apiUri');
    }

    onModuleInit() {
        this.logger.log('Initializing GithubService...');
        this.intervalSubscription = interval(this.FETCH_INTERVAL_MINUTES * 60 * 1000)
          .pipe(
            switchMap(() => this.fetchTrendingRepositories()),
          )
          .subscribe({
            next: (repos) => this.handleRepositories(repos),
            error: (error) => this.logger.error('Error fetching repositories', error),
          });
    
        // Initial fetch
        this.fetchTrendingRepositories().subscribe({
          next: (repos) => this.handleRepositories(repos),
          error: (error) => this.logger.error('Error fetching repositories', error),
        });
    }    

    onModuleDestroy() {
        if (this.intervalSubscription) {
          this.intervalSubscription.unsubscribe();
        }
        this.logger.log('GithubService destroyed');
    }

    fetchTrendingRepositories(): Observable<RepositoryDoc[]> {
        this.logger.log('Fetching trending repositories from GitHub...');
        return this.httpService.get<{ items: RepositoryDoc[] }>(`${this.GITHUB_API_URL}/search/repositories`, {
            params: {
                q: 'stars:>1',
                sort: 'stars',
                order: 'desc',
                per_page: 10,
            },
        }).pipe(
            switchMap(response => [response.data.items]),
        );
    }

    private async handleRepositories(repos: RepositoryDoc[]) {
        this.logger.log(`Fetched ${repos.length} trending repositories.`);
        
        try {
            const ownerRepos = this.extractOwnerRepos(repos);
            const newOwners = await this.ownerService.getNewOwners(ownerRepos);

            if (newOwners.length > 0) {
                await this.ownerService.createMany(newOwners);
                this.logger.log(`Сохранено ${newOwners.length} новых владельцев в базу данных.`);
            } else {
                this.logger.log('Нет новых владельцев для сохранения.');
            }

            const ownerIds = ownerRepos.map((owner) => {return owner.id});
            const allOwners = await this.ownerService.getOwnersByIds(ownerIds);
            const updatedRepos = this.mapReposWithOwnerIds(repos, allOwners);

            const newRepos = await this.repositoryService.getNewRepositories(updatedRepos);
            if (newRepos.length > 0) {
                await this.repositoryService.createMany(newRepos);
                this.logger.log(`Успешно сохранено ${newRepos.length} новых репозиториев в базу данных.`);
            } else {
                this.logger.log('Нет новых репозиториев для сохранения.');
            }
        } catch (error) {
            this.logger.error('Ошибка при сохранении репозиториев или владельцев в базу данных.', error);
        }
    }

    private extractOwnerRepos(repos: RepositoryDoc[]): OwnerDoc[] {
        return repos
            .filter(repo => repo.owner && typeof repo.owner === 'object')
            .map(repo => repo.owner) as OwnerDoc[];
    }

    private mapReposWithOwnerIds(repos: RepositoryDoc[], owners: OwnerDoc[]): RepositoryDoc[] {
        const ownerIdMap = new Map<number, OwnerDoc>();
        owners.forEach(owner => ownerIdMap.set(owner.id, owner));

        return repos.map(repo => {
            const owner = repo.owner;
            if (owner && typeof owner === 'object') {
                const ownerEntity = ownerIdMap.get(owner.id);
                repo.owner = ownerEntity ? ownerEntity.id : null;
            } else {
                repo.owner = null;
            }
            return repo;
        });
    }
}