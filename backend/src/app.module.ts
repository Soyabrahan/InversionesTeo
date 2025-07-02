import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './modules/producto.module';
import { MarcaModule } from './modules/marca.module';
import { TipoModule } from './modules/tipo.module';
import { MonedaModule } from './modules/moneda.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: (() => {
        const host =
          process.env.DATABASE_HOST ||
          'ep-white-violet-ac63k43q-pooler.sa-east-1.aws.neon.tech';
        console.log('🔍 DATABASE_HOST:', host);
        return host;
      })(),
      port: (() => {
        const port = parseInt(process.env.DATABASE_PORT || '5432');
        console.log('🔍 DATABASE_PORT:', port);
        return port;
      })(),
      username: (() => {
        const username = process.env.DATABASE_USERNAME || 'neondb_owner';
        console.log('🔍 DATABASE_USERNAME:', username);
        return username;
      })(),
      password: (() => {
        const password = process.env.DATABASE_PASSWORD || 'npg_RXCarMN2f9wL';
        console.log('🔍 DATABASE_PASSWORD:', password ? '***' : 'undefined');
        return password;
      })(),
      database: (() => {
        const database = process.env.DATABASE_NAME || 'neondb';
        console.log('🔍 DATABASE_NAME:', database);
        return database;
      })(),
      autoLoadEntities: true,
      synchronize: true, // Solo para desarrollo
      ssl: process.env.DATABASE_SSL === 'true' || true, // Importante para Neon
    }),
    ProductoModule,
    MarcaModule,
    TipoModule,
    MonedaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
