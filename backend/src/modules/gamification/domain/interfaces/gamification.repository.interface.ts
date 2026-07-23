import { UserGamificationEntity } from '../entities/user-gamification.entity';

export interface IGamificationRepository {
  findByUserId(userId: string): Promise<UserGamificationEntity | null>;

  save(user: UserGamificationEntity): Promise<void>;
}
