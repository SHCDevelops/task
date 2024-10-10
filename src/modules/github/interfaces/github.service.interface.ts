import { Observable } from 'rxjs';
import { RepositoryDoc } from '../repository/entities/repository.entity';

export interface IGithubService {
  fetchTrendingRepositories(): Observable<RepositoryDoc[]>;
  onModuleInit(): void;
  onModuleDestroy(): void;
}