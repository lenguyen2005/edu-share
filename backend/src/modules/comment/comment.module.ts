import { Module } from '@nestjs/common';
import { CreateCommentUseCase } from './application/use-cases/create-comment.usecase';
import { UpdateCommentUseCase } from './application/use-cases/update-comment.usecase';
import { DeleteCommentUseCase } from './application/use-cases/delete-comment.usecase';
import { ResolveCommentUseCase } from './application/use-cases/resolve-comment.usecase';
import { GetDocumentCommentsUseCase } from './application/use-cases/get-document-comments.usecase';
import { ReplyCommentUseCase } from './application/use-cases/reply-comment.usecase';
import { CommentRepository } from './domain/interfaces/comment.repository.interface';
import { PrismaCommentRepository } from './infrastructure/persistence/prisma/repositories/prisma-comment.repository';
import { CommentController } from './presentation/controllers/comment.controller';
import { DocumentModule } from '../document/document.module';
import { PrismaCommentQueryRepository } from './infrastructure/persistence/prisma/repositories/prisma-comment-query.repository';

@Module({
  controllers: [CommentController],
  imports: [DocumentModule],

  providers: [
    CreateCommentUseCase,
    UpdateCommentUseCase,
    DeleteCommentUseCase,
    ResolveCommentUseCase,
    GetDocumentCommentsUseCase,
    ReplyCommentUseCase,

    {
      provide: CommentRepository,
      useClass: PrismaCommentRepository,
    },

    {
      provide: 'ICommentQueryRepository',

      useClass: PrismaCommentQueryRepository,
    },
  ],

  exports: [CommentRepository],
})
export class CommentModule {}
