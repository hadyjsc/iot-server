import { Module } from '@nestjs/common';
import { TransporterService } from './services/transporter.service';
import { TransporterController } from './controllers/transporter.controller';

@Module({
  controllers: [TransporterController],
  providers: [TransporterService]
})
export class TransporterModule {}
