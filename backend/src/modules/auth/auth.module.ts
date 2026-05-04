import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { PrismaUserRepository } from './infrastructure/persistence/prisma/repositories/prisma-user.repository';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password-hasher';
import { PrismaModule } from 'src/shared/database/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.use-case';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,

    { provide: 'IUserRepository', useClass: PrismaUserRepository },
    { provide: 'IPasswordHasher', useClass: BcryptPasswordHasher },
    { provide: 'ITokenService', useClass: JwtTokenService },

    JwtStrategy,
  ],
  exports: [PassportModule, 'IUserRepository', 'IPasswordHasher'],
})
export class AuthModule {}
