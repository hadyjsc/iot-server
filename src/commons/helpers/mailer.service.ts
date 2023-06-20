import { MailerService } from "@nestjs-modules/mailer";
import { MailerDto } from "../dtos/mailer.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Mailer {
    constructor(private mailer: MailerService) {
    }

    async send(data: MailerDto){
        return await this.mailer.sendMail({
            to: data.mail_to,
            subject: data.subject,
            template: data.template,
            context: data.template_data
        })
    }
}