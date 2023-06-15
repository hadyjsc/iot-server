import { Module } from '@nestjs/common';
import { HardwaresService } from './services/hardwares.service';
import { HardwaresController } from './controllers/hardwares.controller';
import { CommonModule } from 'src/commons/common.module';
import { FeatureFlagService } from 'src/commons/helpers/featureflag.service';

@Module({
  imports:[
    CommonModule
  ],
  controllers: [HardwaresController],
  providers: [HardwaresService, FeatureFlagService]
})
export class HardwaresModule {}
