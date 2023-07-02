import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFeatureDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    owner: string

    created_by: number
}
