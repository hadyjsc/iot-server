import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailConfigService } from './mail.config';
import { JwtModule } from '@nestjs/jwt';
import { JwTokenService } from './jw-token.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useClass: ConfigService
        }),
        MailerModule.forRootAsync({
            useClass: MailConfigService,
        }),
        // PassportModule,
        // JwtModule.registerAsync({
        //     useClass: JwTokenService,
        // })
    ],
    providers: [ ConfigService ],
    exports: [ ConfigService ]
})
export class ConfigModule { }
