import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { JwtService } from './service/jwt.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'dev',
      signOptions: { expiresIn: '365d' },
      global: true,
    }),
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
