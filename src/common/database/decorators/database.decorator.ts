import { Type } from "@nestjs/common";
import { InjectModel, Prop, PropOptions, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';
import { DATABASE_CONNECTION_NAME } from "../constants/database.constant";

export function DatabaseEntity(options?: SchemaOptions): ClassDecorator {
    return Schema({
        ...options,
        timestamps: options?.timestamps ?? {
            createdAt: true,
            updatedAt: true,
        },
    });
}

export function DatabaseProp(options?: PropOptions<any>): PropertyDecorator {
    return Prop(options);
}

export function DatabaseSchema<T = any, N = MongooseSchema<T>>(
    entity: Type<T>
): N {
    return SchemaFactory.createForClass<T>(entity) as N;
}

export function DatabaseModel(
    entity: any,
    connectionName?: string
): ParameterDecorator {
    return InjectModel(entity, connectionName ?? DATABASE_CONNECTION_NAME);
}