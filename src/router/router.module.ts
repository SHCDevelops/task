import { DynamicModule, ForwardReference, Module, Type } from "@nestjs/common";
import { RoutesPublicModule } from "./routes/routes.public.module";
import { RouterModule as NestJsRouterModule } from '@nestjs/core';

@Module({})
export class RouterModule {
    static forRoot(): DynamicModule {
        const imports: (
            | DynamicModule
            | Type<any>
            | Promise<DynamicModule>
            | ForwardReference<any>
        )[] = [];

        imports.push(
            RoutesPublicModule,
            NestJsRouterModule.register([
                {
                    path: '/public',
                    module: RoutesPublicModule
                }
            ])
        )

        return {
            module: RouterModule,
            providers: [],
            exports: [],
            controllers: [],
            imports,
        };
    }
}