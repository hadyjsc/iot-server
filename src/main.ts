import { ApplicationContext } from './app.context';
import { ConfigService } from './commons/configs/config.service';

async function bootstrap() {
  const app = await ApplicationContext();
  await app.listen(app.get(ConfigService).get("APP_PORT")).then((v) => {
    console.log(`Server ${app.get(ConfigService).get("APP_NAME")} is running on port ${app.get(ConfigService).get("APP_PORT")}`);
  });
}

bootstrap();
