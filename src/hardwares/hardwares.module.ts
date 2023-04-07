import { Module } from '@nestjs/common';
import { HardwaresService } from './services/hardwares.service';
import { HardwaresController } from './controllers/hardwares.controller';

@Module({
  controllers: [HardwaresController],
  providers: [HardwaresService]
})
export class HardwaresModule {}
