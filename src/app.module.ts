import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HardwaresModule } from './hardwares/hardwares.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [HardwaresModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
