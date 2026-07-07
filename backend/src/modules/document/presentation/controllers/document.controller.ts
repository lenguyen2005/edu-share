import {
  Controller,
  UseGuards,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { UploadDocumentUseCase } from '../../application/use-cases/upload-document.use-case';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UploadDocumentDto } from '../../application/dtos/upload-document.dto';
import { IUserIdentity } from 'src/modules/auth/domain/interfaces/identity.interface';
import { Express } from 'express';
import { GetDocumentLinkUseCase } from '../../application/use-cases/get-document-link.use-case';
import { ArchiveDocumentUseCase } from '../../application/use-cases/archive-document.use-case';
import { GetDocumentsUseCase } from '../../application/use-cases/get-documents.use-case';
import { OptionalJwtAuthGuard } from 'src/modules/auth/infrastructure/guards/optional-jwt-auth.guard';
import { PublishDocumentUseCase } from '../../application/use-cases/publish-document.use-case';
import { GetDocumentUseCase } from '../../application/use-cases/get-document.use-case';

@Controller('documents')
export class DocumentController {
  constructor(
    private readonly uploadUseCase: UploadDocumentUseCase,
    private readonly getDocumentLinkUseCase: GetDocumentLinkUseCase,
    private readonly archiveDocumentUseCase: ArchiveDocumentUseCase,
    private readonly getDocumentsUseCase: GetDocumentsUseCase,
    private readonly publishDocumentUseCase: PublishDocumentUseCase,
    private readonly getDocumentUseCase: GetDocumentUseCase,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string, @CurrentUser() user?: IUserIdentity) {
    const document = await this.getDocumentUseCase.execute({
      documentId: id,
      currentUserId: user?.id,
    });

    return document;
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() dto: UploadDocumentDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: IUserIdentity,
  ) {
    const result = await this.uploadUseCase.execute(dto, file, user.id);

    return {
      success: true,
      data: result,
    };
  }

  @Get(':id/download-link')
  @UseGuards(OptionalJwtAuthGuard)
  async getDownloadLink(
    @Param('id') documentId: string,
    @CurrentUser() user?: IUserIdentity,
  ) {
    const url = await this.getDocumentLinkUseCase.execute(documentId, user?.id);

    return {
      success: true,
      data: { url },
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async archive(@Param('id') id: string, @CurrentUser() user: IUserIdentity) {
    await this.archiveDocumentUseCase.execute(id, user.id);
    return {
      success: true,
      message: 'Tài liệu đã được đưa vào kho lưu trữ',
    };
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  getDocuments(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 10,
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
    @CurrentUser() user?: IUserIdentity,
  ) {
    return this.getDocumentsUseCase.execute(
      {
        page,
        limit,
        categoryId,
        search,
      },
      user?.id,
    );
  }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard)
  async publish(@Param('id') id: string, @CurrentUser() user: IUserIdentity) {
    await this.publishDocumentUseCase.execute(id, user.id);
    return { success: true, message: 'Tài liệu đã được công khai' };
  }
}
