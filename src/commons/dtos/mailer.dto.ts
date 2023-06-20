import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";

export class MailerDto {
    @IsEmail()
    @IsNotEmpty()
    mail_to: string

    @IsNotEmpty()
    subject: string

    @IsNotEmpty()
    template: string

    @IsNotEmpty()
    template_data: any
}