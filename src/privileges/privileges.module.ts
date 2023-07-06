import { Module } from '@nestjs/common';
import { PrivilegesService } from './services/privileges.service';
import { PrivilegesController } from './controllers/privileges.controller';
import { JwtService } from '@nestjs/jwt';
import { PrivilegeRepository } from './repositories/privilege.repository';
import { UsersService } from 'src/users/services/users.service';
import { UserRepository } from 'src/users/repositories/user.repository';
import { PermissionsService } from 'src/permissions/services/permissions.service';
import { PermissionRepository } from 'src/permissions/repositories/permission.repository';

@Module({
  controllers: [PrivilegesController],
  providers: [PrivilegesService, JwtService, UsersService, UserRepository, PrivilegeRepository, PermissionsService, PermissionRepository]
})
export class PrivilegesModule {}
