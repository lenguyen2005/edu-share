import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';

import { IUserIdentity } from 'src/modules/auth/domain/interfaces/identity.interface';
import { Role } from 'src/modules/auth/domain/enum/role.enum';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/infrastructure/guards/roles.guard';

import { AddExpUseCase } from '../../application/use-cases/add-exp.use-case';
import { GetLeaderboardUseCase } from '../../application/use-cases/get-leaderboard.use-case';
import { GetLevelConfigsUseCase } from '../../application/use-cases/get-level-configs.use-case';
import { GetPointHistoryUseCase } from '../../application/use-cases/get-point-history.use-case';
import { GetUserGamificationUseCase } from '../../application/use-cases/get-user-gamification.use-case';

import { AddExpRequestDto } from '../dtos/add-exp.request';
import { LeaderboardQueryDto } from '../dtos/leaderboard.query';
import { PointHistoryQueryDto } from '../dtos/point-history.query';

import { AddExpMapper } from '../mappers/add-exp.mapper';
import { GamificationMapper } from '../mappers/gamification.mapper';
import { LeaderboardMapper } from '../mappers/leaderboard.mapper';
import { LevelConfigMapper } from '../mappers/level-config.mapper';
import { PointHistoryMapper } from '../mappers/point-history.mapper';

@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(
    private readonly addExpUseCase: AddExpUseCase,
    private readonly getLeaderboardUseCase: GetLeaderboardUseCase,
    private readonly getLevelConfigsUseCase: GetLevelConfigsUseCase,
    private readonly getPointHistoryUseCase: GetPointHistoryUseCase,
    private readonly getUserGamificationUseCase: GetUserGamificationUseCase,
  ) {}

  @Get('me')
  async getMyGamification(@CurrentUser() currentUser: IUserIdentity) {
    const result = await this.getUserGamificationUseCase.execute(
      currentUser.id,
    );

    return {
      success: true,
      data: GamificationMapper.toResponse(result),
    };
  }

  @Get('leaderboard')
  async getLeaderboard(@Query() query: LeaderboardQueryDto) {
    const result = await this.getLeaderboardUseCase.execute(query.limit);

    return {
      success: true,
      data: LeaderboardMapper.toResponse(result),
    };
  }

  @Get('point-history')
  async getPointHistory(
    @CurrentUser() currentUser: IUserIdentity,
    @Query() query: PointHistoryQueryDto,
  ) {
    const result = await this.getPointHistoryUseCase.execute(currentUser.id, {
      page: query.page,
      limit: query.limit,
    });

    return {
      success: true,
      data: PointHistoryMapper.toResponse(result),
    };
  }

  @Get('level-configs')
  async getLevelConfigs() {
    const result = await this.getLevelConfigsUseCase.execute();

    return {
      success: true,
      data: LevelConfigMapper.toResponse(result),
    };
  }

  @Post('add-exp')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async addExp(@Body() dto: AddExpRequestDto) {
    const result = await this.addExpUseCase.execute({
      userId: dto.userId,
      amount: dto.amount,
      reason: dto.reason,
      referenceId: dto.referenceId,
      referenceType: dto.referenceType,
    });

    return {
      success: true,
      data: AddExpMapper.toResponse(result),
    };
  }
}
