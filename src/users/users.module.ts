import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { PermissionsService } from 'src/permissions/services/permissions.service';
import { PermissionRepository } from 'src/permissions/repositories/permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, JwtService, PermissionsService, PermissionRepository]
})
export class UsersModule {}
