import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Auth } from './auth/entity/auth.entity';
import { AuthService } from './auth/service/auth.service';
import { JwtService } from './auth/service/jwt.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'mariadb',
        host: process.env.DB_HOST, // Utilisez le nom du service Docker comme hôte
        port: +process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        extra: {
          socketPath: process.env.DB_SOCKET,
        },
        entities: [Auth],
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
  ],
  providers: [AppService, AuthService, JwtService],
  controllers: [AppController],
})
export class AppModule {}
