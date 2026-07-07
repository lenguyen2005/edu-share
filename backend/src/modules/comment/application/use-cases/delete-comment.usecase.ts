import { CommentRepository } from '../../domain/interfaces/comment.repository.interface';

import { CommentDeletedException } from '../../domain/exceptions/comment-deleted.exception';
import { CommentNotFoundException } from '../../domain/exceptions/comment-not-found.exception';
import { CommentPermissionDeniedException } from '../../domain/exceptions/comment-permission-denied.exception';
import { DeleteCommentCommand } from '../commands/delete-comment.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: DeleteCommentCommand): Promise<void> {
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

    await this.commentRepository.softDelete(command.commentId);
  }
}
