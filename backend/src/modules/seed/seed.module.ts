import { Module } from '@nestjs/common';
import { SeedAdminUseCase } from './application/use-cases/seed-admin.use-case';
import { SeedService } from './infrastructure/services/seed.service';
import { AuthModule } from '../auth/auth.module';
import { GamificationModule } from '../gamification/gamification.module';
import { SeedLevelConfigUseCase } from './application/use-cases/seed-level-config.use-case';

@Module({
  imports: [AuthModule, GamificationModule],
  providers: [SeedAdminUseCase, SeedService, SeedLevelConfigUseCase],
})
export class SeedModule {}
