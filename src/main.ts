import { ValidationPipe } from '@nestjs/common';
import { ApplicationContext } from './app.context';
import { ConfigService } from './commons/configs/config.service';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet'
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await ApplicationContext();
  app.use(cookieParser())
  // app.use(csurf())
  app.enableCors()
  app.use(helmet())

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(app.get(ConfigService).get("APP_PORT")).then((v) => {
    console.log(`Server ${app.get(ConfigService).get("APP_NAME")} is running on port ${app.get(ConfigService).get("APP_PORT")}`);
  });
}

bootstrap();
