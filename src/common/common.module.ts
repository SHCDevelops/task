import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import configs from "src/configs";
import { DATABASE_CONNECTION_NAME } from "./database/constants/database.constant";
import { DatabaseModule } from "./database/database.module";
import { DatabaseService } from "./database/services/database.service";
import { RequestModule } from "./request/request.module";
import { PaginationModule } from "./pagination/pagination.module";


@Module({
    controllers: [],
    providers: [],
    imports: [
        // Config
        ConfigModule.forRoot({
            load: configs,
            isGlobal: true,
            cache: true,
            envFilePath: ['.env'],
            expandVariables: false,
        }),

        // MongoDB
        MongooseModule.forRootAsync({
            connectionName: DATABASE_CONNECTION_NAME,
            imports: [DatabaseModule],
            inject: [DatabaseService],
            useFactory: (databaseService: DatabaseService) =>
                databaseService.createOptions(),
        }),

        RequestModule.forRoot(),
        PaginationModule.forRoot()
    ],
})
export class CommonModule {}