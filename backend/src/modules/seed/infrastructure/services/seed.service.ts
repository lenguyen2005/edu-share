import { Injectable, OnModuleInit } from '@nestjs/common';
import { SeedAdminUseCase } from '../../application/use-cases/seed-admin.use-case';
import { SeedLevelConfigUseCase } from '../../application/use-cases/seed-level-config.use-case';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly seedAdminUseCase: SeedAdminUseCase,
    private readonly seedLevelConfig: SeedLevelConfigUseCase,
  ) {}

  async onModuleInit() {
    await this.seedAdminUseCase.execute();
    await this.seedLevelConfig.execute();
  }
}
