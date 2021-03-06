import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  appendGlobalSettingsToNestApp,
  globalRoutePrefix,
} from './app/nest-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appendGlobalSettingsToNestApp(app);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log(
      'Listening at http://localhost:' + port + '/' + globalRoutePrefix
    );
  });
}

bootstrap();
