
import { Module } from '@nestjs/common';
import { FeaturesService } from './services/features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesController } from './controllers/features.controller';
import { FeaturesRepository } from './repositories/features.repositories';
import { Feature } from './entities/feature.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { UserRepository } from 'src/users/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  controllers: [FeaturesController],
  providers: [FeaturesService, FeaturesRepository, JwtService, UsersService, UserRepository]
})
export class FeaturesModule {}
