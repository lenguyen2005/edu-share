import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { RegisterInput } from '../../application/inputs/register.input';
import { UserResponseDto } from '../dtos/user-response.dto';
import { LoginDto } from '../dtos/login.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { IUserIdentity } from '../../domain/interfaces/identity.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../infrastructure/guards/jwt-auth.guard';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.use-case';
import { LogoutUseCase } from '../../application/use-cases/logout.use-case';
import { RolesGuard } from '../../infrastructure/guards/roles.guard';
import { Role } from '../../domain/enum/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { cookieOptions } from '../config/cookie-options';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    const input = new RegisterInput(
      dto.email,
      dto.password,
      dto.confirmPassword,
      dto.fullName,
    );
    const user = await this.registerUseCase.execute(input);

    return {
      success: true,
      data: new UserResponseDto(
        user.id,
        user.getEmail().getValue(),
        user.getFullName(),
        user.getRole(),
      ),
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true })
    res: Response,
  ) {
    const result = await this.loginUseCase.execute({
      email: dto.email,
      password: dto.password,
    });

    res.cookie('refreshToken', result.refreshToken, cookieOptions);

    return {
      success: true,
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@CurrentUser() user: IUserIdentity) {
    return {
      success: true,
      data: user,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true })
    res: Response,
  ) {
    const refreshToken = req.cookies.refreshToken as string;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const result = await this.refreshTokenUseCase.execute(refreshToken);

    res.cookie('refreshToken', result.refreshToken, cookieOptions);

    return {
      success: true,

      data: {
        accessToken: result.accessToken,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @CurrentUser() user: IUserIdentity,
    @Res({ passthrough: true })
    res: Response,
  ) {
    await this.logoutUseCase.execute(user.id);

    res.clearCookie('refreshToken', cookieOptions);

    return {
      success: true,
      message: 'Đăng xuất thành công',
    };
  }

  @Post('admin-only-action')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  doAdminAction() {
    return {
      success: true,
      message: 'Chào sếp!',
    };
  }
}
