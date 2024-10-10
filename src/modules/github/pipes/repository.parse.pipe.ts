import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { RepositoryService } from '../services/repository.service';
import { RepositoryDoc } from '../repository/entities/repository.entity';

@Injectable()
export class RepositoryParsePipe implements PipeTransform {
    constructor(private readonly repositoryService: RepositoryService) {}

    async transform(value: any): Promise<RepositoryDoc> {
        const repo: RepositoryDoc = await this.repositoryService.findOneById(value, { join: true });
        if (!repo) {
            throw new NotFoundException({
                statusCode: 5050,
            });
        }

        return repo;
    }
}
