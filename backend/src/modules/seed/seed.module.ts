import { Module } from '@nestjs/common';
import { SeedAdminUseCase } from './application/use-cases/seed-admin.use-case';
import { SeedService } from './infrastructure/services/seed.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [SeedAdminUseCase, SeedService],
})
export class SeedModule {}
