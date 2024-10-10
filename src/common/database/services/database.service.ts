import { Injectable } from "@nestjs/common";
import { IDatabaseService } from "../interfaces/database.service.interface";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";
import mongoose from 'mongoose';

@Injectable()
export class DatabaseService implements IDatabaseService {
    constructor(private readonly configService: ConfigService) {}

    createOptions(): MongooseModuleOptions {
        const uri = this.configService.get<string>('database.uri');
        const debug = this.configService.get<boolean>('database.debug');

        const timeoutOptions = this.configService.get<Record<string, number>>(
            'database.timeoutOptions'
        );

        mongoose.set('debug', debug)

        const mongooseOptions: MongooseModuleOptions = {
            uri,
            ...timeoutOptions,
        };

        return mongooseOptions;
    }
}