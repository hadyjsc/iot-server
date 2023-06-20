import { MailerOptions, MailerOptionsFactory } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from "path";

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
    createMailerOptions(): MailerOptions | Promise<MailerOptions> {
        const baseDir = join(__dirname, '../../../');
        const tempDir =  `${baseDir}template/email`
        
        return {
            transport: {
                host: process.env.EMAIL_HOST,
                secure: false,
                service: process.env.EMAIL_SERVICE || undefined,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                port: parseInt(process.env.EMAIL_PORT),
                tls:  {
                    rejectUnauthorized: false
                }
            },
            defaults: {
                from: '<No Reply>'
            },
            template: {
                dir: tempDir,
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true
                }
            },
            preview: false
        }
    }
}