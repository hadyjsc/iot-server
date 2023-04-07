import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { HardwaresModule } from '../hardwares/hardwares.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HardwaresModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
