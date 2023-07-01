import { IsNotEmpty } from "class-validator"

export class UpdateAuthDto {
    @IsNotEmpty()
    user_id: number

    token: string

    @IsNotEmpty()
    refresh_token: string
}
