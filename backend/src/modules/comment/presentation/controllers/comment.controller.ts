import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IUserIdentity } from 'src/modules/auth/domain/interfaces/identity.interface';

import { CreateCommentUseCase } from '../../application/use-cases/create-comment.usecase';
import { UpdateCommentUseCase } from '../../application/use-cases/update-comment.usecase';
import { DeleteCommentUseCase } from '../../application/use-cases/delete-comment.usecase';
import { ResolveCommentUseCase } from '../../application/use-cases/resolve-comment.usecase';
import { ReplyCommentUseCase } from '../../application/use-cases/reply-comment.usecase';
import { GetDocumentCommentsUseCase } from '../../application/use-cases/get-document-comments.usecase';

import { CreateCommentRequest } from '../dtos/create-comment.request';
import { UpdateCommentRequest } from '../dtos/update-comment.request';

import { CreateCommentCommand } from '../../application/commands/create-comment.command';
import { UpdateCommentCommand } from '../../application/commands/update-comment.command';
import { DeleteCommentCommand } from '../../application/commands/delete-comment.command';
import { ResolveCommentCommand } from '../../application/commands/resolve-comment.command';
import { ReplyCommentCommand } from '../../application/commands/reply-comment.command';

@Controller()
export class CommentController {
  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly updateCommentUseCase: UpdateCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
    private readonly resolveCommentUseCase: ResolveCommentUseCase,
    private readonly replyCommentUseCase: ReplyCommentUseCase,
    private readonly getDocumentCommentsUseCase: GetDocumentCommentsUseCase,
  ) {}

  @Post('comments')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() request: CreateCommentRequest,
    @CurrentUser() user: IUserIdentity,
  ) {
    const command: CreateCommentCommand = {
      content: request.content,
      documentId: request.documentId,
      parentId: request.parentId,
      userId: user.id,
    };

    const comment = await this.createCommentUseCase.execute(command);

    return {
      success: true,
      message: 'Comment created successfully.',
      data: comment,
    };
  }

  @Post('comments/:id/replies')
  @UseGuards(JwtAuthGuard)
  async reply(
    @Param('id') commentId: string,
    @Body() request: CreateCommentRequest,
    @CurrentUser() user: IUserIdentity,
  ) {
    const command: ReplyCommentCommand = {
      parentId: commentId,
      content: request.content,
      userId: user.id,
    };

    const comment = await this.replyCommentUseCase.execute(command);

    return {
      success: true,
      message: 'Reply created successfully.',
      data: comment,
    };
  }

  @Put('comments/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') commentId: string,
    @Body() request: UpdateCommentRequest,
    @CurrentUser() user: IUserIdentity,
  ) {
    const command: UpdateCommentCommand = {
      commentId,
      userId: user.id,
      content: request.content,
    };

    const comment = await this.updateCommentUseCase.execute(command);

    return {
      success: true,
      message: 'Comment updated successfully.',
      data: comment,
    };
  }

  @Delete('comments/:id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id') commentId: string,
    @CurrentUser() user: IUserIdentity,
  ) {
    const command: DeleteCommentCommand = {
      commentId,
      userId: user.id,
    };

    await this.deleteCommentUseCase.execute(command);

    return {
      success: true,
      message: 'Comment deleted successfully.',
    };
  }

  @Patch('comments/:id/resolve')
  @UseGuards(JwtAuthGuard)
  async resolve(
    @Param('id') commentId: string,
    @CurrentUser() user: IUserIdentity,
  ) {
    const command: ResolveCommentCommand = {
      commentId,
      userId: user.id,
    };

    const comment = await this.resolveCommentUseCase.execute(command);

    return {
      success: true,
      message: 'Comment resolved successfully.',
      data: comment,
    };
  }

  @Get('documents/:documentId/comments')
  async getDocumentComments(@Param('documentId') documentId: string) {
    const comments = await this.getDocumentCommentsUseCase.execute({
      documentId,
    });

    return {
      success: true,
      data: comments,
    };
  }
}
