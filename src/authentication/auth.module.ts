import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { SecurityService } from 'src/commons/helpers/security.service';
import { UsersService } from 'src/users/services/users.service';
import { UserRepository } from 'src/users/repositories/user.repository';
import { Mailer } from 'src/commons/helpers/mailer.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SecurityService, UsersService, UserRepository, Mailer]
})
export class AuthModule {}
