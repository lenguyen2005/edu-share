import { v4 as uuid } from 'uuid';

import { CommentEntity } from '../../domain/entities/comment.entity';
import { CommentRepository } from '../../domain/interfaces/comment.repository.interface';

import { CommentDeletedException } from '../../domain/exceptions/comment-deleted.exception';
import { ParentCommentNotFoundException } from '../../domain/exceptions/parent-comment-not-found.exception';
import { ReplyCommentCommand } from '../commands/reply-comment.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReplyCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: ReplyCommentCommand): Promise<CommentEntity> {
    const parentComment = await this.commentRepository.findById(
      command.parentId,
    );

    if (!parentComment) {
      throw new ParentCommentNotFoundException();
    }

    if (parentComment.deletedAt) {
      throw new CommentDeletedException();
    }

    const reply = new CommentEntity({
      id: uuid(),
      content: command.content,
      documentId: parentComment.documentId,
      userId: command.userId,
      parentId: parentComment.id,
    });

    return this.commentRepository.create(reply);
  }
}
