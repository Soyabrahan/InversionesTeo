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
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Cambia por tu usuario
      password: '1234', // Cambia por tu contraseña
      database: 'inversiones_teo', // Cambia por tu base de datos
      autoLoadEntities: true,
      synchronize: true, // Solo para desarrollo
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
