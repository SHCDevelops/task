import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { IGithubService } from "../interfaces/github.service.interface";
import { interval, Observable, Subscription, switchMap } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { RepositoryDoc } from "../repository/entities/repository.entity";


@Injectable()
export class GithubService implements IGithubService, OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(GithubService.name);
    private intervalSubscription: Subscription;
    private FETCH_INTERVAL_MINUTES: number;
    private GITHUB_API_URL: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
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

    private handleRepositories(repos: RepositoryDoc[]) {
        this.logger.log(`Fetched ${repos.length} trending repositories.`);
        // TODO: Save to database
    }
}