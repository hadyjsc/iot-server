import { IsNotEmpty, IsNumber, IsBoolean } from "class-validator"

export class UpdatePermissionDto {
    uuid: string

    @IsNotEmpty()
    service: string

    @IsNotEmpty()
    feature: string

    @IsNotEmpty()
    entity: string

    action: string

    name: string

    @IsNotEmpty()
    type: string

    @IsNumber()
    feature_id: number

    @IsBoolean()
    is_active: boolean

    updated_by: number
}
