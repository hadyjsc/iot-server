import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwTokenService implements JwtOptionsFactory {
    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return {
            secret: `${process.env.JWT_SECRET}`,
            signOptions: {
                expiresIn: `${process.env.JWT_EXPIRATION_TIME}`
            }
        }
    }
}
