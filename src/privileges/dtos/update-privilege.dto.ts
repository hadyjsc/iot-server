import { IsNotEmpty } from "class-validator"

export class UpdatePrivilegeDto {
    uuid: string
    
    @IsNotEmpty()
    user_id: number

    @IsNotEmpty()
    permission_id: number

    @IsNotEmpty()
    is_active: boolean

    updated_by: number
}
