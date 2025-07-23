import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

async function bootstrap(): Promise<INestApplication> {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.enableCors({
    origin: '*', // Permitir cualquier origen para pruebas. Cambia a tu dominio real en producción.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await nestApp.init();
  return nestApp;
}

export default async (req, res) => {
  if (!app) {
    app = await bootstrap();
  }
  const server = app.getHttpAdapter().getInstance();
  server(req, res);
};
