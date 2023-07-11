import { IsNotEmpty } from "class-validator";

export class CreateTransporterDto {}

export class SendMessage {
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    message: string
}
