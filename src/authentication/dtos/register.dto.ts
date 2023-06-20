import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegistrationDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    first_name: string

    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsString()
    middle_name: string

    @IsString()
    last_name: string
}