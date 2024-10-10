import { Module } from '@nestjs/common';
import { DatabaseService } from './services/database.service';

@Module({
    providers: [DatabaseService],
    exports: [DatabaseService],
    imports: [],
    controllers: [],
})
export class DatabaseModule {}