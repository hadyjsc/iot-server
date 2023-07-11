import { Module } from '@nestjs/common';
import { TransporterService } from './services/transporter.service';
import { TransporterController } from './controllers/transporter.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { UserRepository } from 'src/users/repositories/user.repository';
import { PermissionsService } from 'src/permissions/services/permissions.service';
import { PermissionRepository } from 'src/permissions/repositories/permission.repository';

@Module({
  controllers: [TransporterController],
  providers: [TransporterService, JwtService, UsersService, UserRepository, PermissionsService, PermissionRepository]
})
export class TransporterModule {}
