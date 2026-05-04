import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
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
  async login(@Body() dto: LoginDto) {
    const result = await this.loginUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
    return {
      success: true,
      data: result,
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
  async refresh(@Body('refreshToken') refreshToken: string) {
    const result = await this.refreshTokenUseCase.execute(refreshToken);
    return {
      success: true,
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: IUserIdentity) {
    await this.logoutUseCase.execute(user.id);

    return {
      success: true,
      message: 'Đăng xuất thành công',
    };
  }

  @Post('admin-only-action')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  doAdminAction() {
    return { message: 'Chào sếp!' };
  }
}
