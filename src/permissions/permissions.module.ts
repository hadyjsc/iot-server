import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from './controllers/permissions.controller';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/repositories/user.repository';
import { UsersService } from 'src/users/services/users.service';
import { PermissionRepository } from './repositories/permission.repository';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, JwtService, UsersService, UserRepository, PermissionRepository]
})
export class PermissionsModule {}
