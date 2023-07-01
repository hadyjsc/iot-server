import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dtos/login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private authService :AuthService) {
        super()
    }

    async validate(data: LoginDto): Promise<any> {
        const user = await this.authService.validateUserCredential(data)
        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}