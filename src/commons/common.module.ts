/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConfigModule as CM } from '@nestjs/config';
import { ConfigModule } from './configs/config.module';
import { HelperModule } from './helpers/helper.module';

@Module({
    imports: [
        CM.forRoot({
            envFilePath: ['.cold.env', '.hot.env'],
            isGlobal: true,
        }),
        ConfigModule,
        HelperModule
    ],
    providers: [],
})
export class CommonModule {}
