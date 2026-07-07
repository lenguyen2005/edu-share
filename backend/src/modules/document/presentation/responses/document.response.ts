import { DocumentEntity } from '../../domain/entities/document.entity';
import { UserEntity } from 'src/modules/auth/domain/entities/user.entity';

class AuthorSummaryResponse {
  id: string;
  fullName: string;
}

export class DocumentResponse {
  id: string;
  title: string;
  description?: string;
  status: string;

  categoryId: string;

  author: AuthorSummaryResponse;

  createdAt: Date;
  updatedAt: Date;

  static fromEntity(
    document: DocumentEntity,
    author: UserEntity,
  ): DocumentResponse {
    return {
      id: document.id,
      title: document.getTitle(),
      description: document.getDescription() ?? undefined,
      status: document.getStatus(),

      categoryId: document.getCategoryId(),

      author: {
        id: author.id,
        fullName: author.getFullName(),
      },

      createdAt: document.getCreatedAt(),
      updatedAt: document.getUpdatedAt(),
    };
  }
}
