import { CommentEntity } from '../../domain/entities/comment.entity';
import { CommentRepository } from '../../domain/interfaces/comment.repository.interface';

import { CommentDeletedException } from '../../domain/exceptions/comment-deleted.exception';
import { CommentNotFoundException } from '../../domain/exceptions/comment-not-found.exception';
import { CommentPermissionDeniedException } from '../../domain/exceptions/comment-permission-denied.exception';
import { UpdateCommentCommand } from '../commands/update-comment.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: UpdateCommentCommand): Promise<CommentEntity> {
    const comment = await this.commentRepository.findById(command.commentId);

    if (!comment) {
      throw new CommentNotFoundException();
    }

    if (comment.deletedAt) {
      throw new CommentDeletedException();
    }

    if (comment.userId !== command.userId) {
      throw new CommentPermissionDeniedException();
    }

    comment.edit(command.content);

    return this.commentRepository.update(comment);
  }
}
