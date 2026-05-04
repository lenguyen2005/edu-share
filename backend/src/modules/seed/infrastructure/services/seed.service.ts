import { Injectable, OnModuleInit } from '@nestjs/common';
import { SeedAdminUseCase } from '../../application/use-cases/seed-admin.use-case';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly seedAdminUseCase: SeedAdminUseCase) {}

  async onModuleInit() {
    await this.seedAdminUseCase.execute();
  }
}
