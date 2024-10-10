import { Type } from "@nestjs/common";
import { InjectModel, Prop, PropOptions, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';
import { DATABASE_CONNECTION_NAME } from "../constants/database.constant";
import { IDatabaseQueryContainOptions } from "../interfaces/database.interface";

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

export function DatabaseQueryIn<T = string>(
    field: string,
    values: T[]
): Record<string, any> {
    return {
        [field]: {
            $in: values,
        },
    };
}

export function DatabaseQueryOr(queries: Record<string, any>[]) {
    return {
        $or: queries,
    };
}

export function DatabaseQueryContain(
    field: string,
    value: string,
    options?: IDatabaseQueryContainOptions
) {

    // Огромный костыль, надо будет исправить ;)
    if (field === 'id') {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
            throw new Error('Invalid ID format');
        }
        return {
            [field]: parsedValue,
        };
    }

    if (options?.fullWord) {
        return {
            [field]: {
                $regex: new RegExp(`\\b${value}\\b`),
                $options: 'i',
            },
        };
    }

    return {
        [field]: {
            $regex: new RegExp(value),
            $options: 'i',
        },
    };
}