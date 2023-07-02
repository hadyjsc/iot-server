import { IsNotEmpty, IsNumber } from "class-validator"

export class UpdateFeatureDto {
    uuid: string

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    owner: string

    @IsNotEmpty()
    is_active: boolean

    updated_by: number
}
