import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { RegistrationDto } from "src/authentication/dtos/register.dto";

export class CreateUserDto {
    
}

export class CreateUserFromRegistrationDto extends RegistrationDto {
}
