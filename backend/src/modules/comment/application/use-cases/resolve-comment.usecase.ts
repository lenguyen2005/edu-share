import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../../domain/entities/comment.entity';
import { CannotResolveReplyException } from '../../domain/exceptions/cannot-resolve-reply.exception';
import { CommentDeletedException } from '../../domain/exceptions/comment-deleted.exception';
import { CommentNotFoundException } from '../../domain/exceptions/comment-not-found.exception';
import { CommentPermissionDeniedException } from '../../domain/exceptions/comment-permission-denied.exception';
import { CommentRepository } from '../../domain/interfaces/comment.repository.interface';
import { ResolveCommentCommand } from '../commands/resolve-comment.command';

@Injectable()
export class ResolveCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: ResolveCommentCommand): Promise<CommentEntity> {
    const comment = await this.commentRepository.findById(command.commentId);

    if (!comment) {
      throw new CommentNotFoundException();
    }

    if (comment.deletedAt) {
      throw new CommentDeletedException();
    }

    if (comment.isReply()) {
      throw new CannotResolveReplyException();
    }

    // Authorization
    if (comment.userId !== command.userId) {
      throw new CommentPermissionDeniedException();
    }

    comment.resolve();

    return this.commentRepository.update(comment);
  }
}
