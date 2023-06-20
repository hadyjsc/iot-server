import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailConfigService } from './mail.config';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useClass: ConfigService
        }),
        MailerModule.forRootAsync({
            useClass: MailConfigService,
        })
    ],
    providers: [ ConfigService ],
    exports: [ ConfigService ]
})
export class ConfigModule { }
