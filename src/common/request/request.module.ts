import { DynamicModule, HttpStatus, Module, ValidationError, ValidationPipe } from "@nestjs/common";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { RequestTimeoutInterceptor } from "./interceptors/request.timeout.interceptor";
import { RequestValidationException } from "./exceptions/request.validation.exception";


@Module({})
export class RequestModule {
    static forRoot(): DynamicModule {
        return {
            module: RequestModule,
            controllers: [],
            providers: [
                {
                    provide: APP_INTERCEPTOR,
                    useClass: RequestTimeoutInterceptor
                },
                {
                    provide: APP_PIPE,
                    useFactory: () =>
                        new ValidationPipe({
                            transform: true,
                            skipUndefinedProperties: true,
                            forbidUnknownValues: true,
                            transformOptions: {
                                enableImplicitConversion: true,
                            },
                            errorHttpStatusCode:
                                HttpStatus.UNPROCESSABLE_ENTITY,
                            exceptionFactory: (errors: ValidationError[]) => {
                                return new RequestValidationException(errors);
                            }
                        })
                },
            ]
        }
    }
}