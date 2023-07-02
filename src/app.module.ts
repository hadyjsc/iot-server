import { APP_FILTER, APP_GUARD, Reflector } from '@nestjs/core';
import { AllExceptionsFilter } from './commons/exceptions/exception.filter';
import { HelperModule } from './commons/helpers/helper.module';
import { CommonModule } from './commons/common.module';
import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { HardwaresModule } from './hardwares/hardwares.module';
import { UsersModule } from './users/users.module';
import { PigeonModule, Transport } from 'pigeon-mqtt-nest'
import { TransporterModule } from './transporter/transporter.module';
import { AuthModule } from './authentication/auth.module';
import { RolesModule } from './roles/roles.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './commons/interceptors/response.interceptor';
import { LoggingInterceptor } from './commons/interceptors/logging.interceptor';
import { AccessTokenGuard } from './commons/guard/access-token.guard';
import { FeaturesModule } from './features/features.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PrivilegesModule } from './privileges/privileges.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/services/users.service';
import { UserRepository } from './users/repositories/user.repository';

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
    TransporterModule,
    AuthModule,
    RolesModule,
    FeaturesModule,
    PermissionsModule,
    PrivilegesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }, {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }, {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_GUARD,
      useClass:  AccessTokenGuard,
    },
    JwtService,
    UsersService, 
    UserRepository
  ],
})

export class AppModule { }
