import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { Module } from '@nestjs/common';

@Module({
    imports:[TypeOrmModule.forRootAsync({
        useClass: ConfigService
    })],
    providers: [ ConfigService ],
    exports: [ ConfigService ]
})
export class ConfigModule { }
