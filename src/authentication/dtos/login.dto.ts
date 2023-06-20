import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}

export class UserLogedInDto extends LoginDto {
    @IsNotEmpty()
    token: string
}