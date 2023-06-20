import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

const PASSWORD_SALT = 14

@Injectable()
export class SecurityService { 
    async generatePassword(password: string) : Promise<string> {
        return bcrypt.hash(password, PASSWORD_SALT)
    }
}
