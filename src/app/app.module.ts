import { Module } from "@nestjs/common";
import { CommonModule } from "src/common/common.module";

@Module({
    controllers: [],
    providers: [],
    imports: [
        CommonModule,
    ],
})
export class AppModule { }