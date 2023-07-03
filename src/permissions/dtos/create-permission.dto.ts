import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePermissionDto {
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

    created_by: number
}
