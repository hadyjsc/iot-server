import { IsNotEmpty } from "class-validator"
import { UserEntity } from "src/users/entities/user.entity"

export class CreateAuthDto {
    @IsNotEmpty()
    user_id: number

    @IsNotEmpty()
    token: string

    @IsNotEmpty()
    refresh_token: string
}
