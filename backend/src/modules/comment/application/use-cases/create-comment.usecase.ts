import { IDocumentRepository } from 'src/modules/document/domain/interfaces/document.repository.interface';
import { CommentRepository } from '../../domain/interfaces/comment.repository.interface';
import { CommentEntity } from '../../domain/entities/comment.entity';
import { v4 as uuid } from 'uuid';
import { CreateCommentCommand } from '../commands/create-comment.command';
import { ParentCommentNotFoundException } from '../../domain/exceptions/parent-comment-not-found.exception';
import { ParentCommentMismatchException } from '../../domain/exceptions/parent-comment-mismatch.exception';
import { DocumentNotFoundException } from 'src/modules/document/domain/exceptions/document-not-found.exception';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateCommentUseCase {
  constructor(
    private readonly commentRepository: CommentRepository,
    @Inject('IDocumentRepository')
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute(command: CreateCommentCommand): Promise<CommentEntity> {
    const document = await this.documentRepository.findById(command.documentId);

    if (!document) {
      throw new DocumentNotFoundException();
    }

    if (command.parentId) {
      const parentComment = await this.commentRepository.findById(
        command.parentId,
      );

      if (!parentComment) {
        throw new ParentCommentNotFoundException();
      }

      if (parentComment.documentId !== command.documentId) {
        throw new ParentCommentMismatchException();
      }
    }

    const comment = new CommentEntity({
      id: uuid(),
      content: command.content,
      documentId: command.documentId,
      userId: command.userId,
      parentId: command.parentId ?? null,
    });

    return this.commentRepository.create(comment);
  }
}
