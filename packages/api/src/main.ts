import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
      origin: [process.env.FRONTEND_URL],
      credentials: true,
  })

  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`GraphQL is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();
