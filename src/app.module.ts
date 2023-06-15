import { HelperModule } from './commons/helpers/helper.module';
import { CommonModule } from './commons/common.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HardwaresModule } from './hardwares/hardwares.module';
import { UsersModule } from './users/users.module';
import { PigeonModule, Transport } from 'pigeon-mqtt-nest'
import { TransporterModule } from './transporter/transporter.module';

@Module({
  imports: [
    HelperModule,
    CommonModule,
    PigeonModule.forRoot({
      port: process.env.MQTT_PORT,
      transport: Transport.TCP,
      id: process.env.MQTT_BROKER_ID,
      concurrency: process.env.MQTT_CONCURRENCY,
      queueLimit: process.env.MQTT_QUEUE_LIMIT,
      connectTimeout: process.env.MQTT_CONNECT_TIMEOUT,
      heartbeatInterval: process.env.MQTT_HEART_BEAT_INTERVAL,
    }),
    HardwaresModule,
    UsersModule,
    TransporterModule
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule { }
