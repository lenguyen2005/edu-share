import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/modules/auth/infrastructure/guards/optional-jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IUserIdentity } from 'src/modules/auth/domain/interfaces/identity.interface';

// DTOs
import { UploadDocumentDto } from '../../application/dtos/upload-document.dto';

// Use Cases
import { CreateDocumentUseCase } from './../../application/use-cases/create-document.use-case';
import { GenerateUploadUrlUseCase } from '../../application/use-cases/generate-upload-url.use-case';
import { GetDocumentLinkUseCase } from '../../application/use-cases/get-document-link.use-case';
import { ArchiveDocumentUseCase } from '../../application/use-cases/archive-document.use-case';
import { GetDocumentsUseCase } from '../../application/use-cases/get-documents.use-case';
import { PublishDocumentUseCase } from '../../application/use-cases/publish-document.use-case';
import { GetDocumentUseCase } from '../../application/use-cases/get-document.use-case';
import { GenerateUrlDto } from '../../application/dtos/generate-url.dto';

@Controller('documents')
export class DocumentController {
  constructor(
    private readonly createDocumentUseCase: CreateDocumentUseCase,
    private readonly generateUploadUrlUseCase: GenerateUploadUrlUseCase,
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

  @Post('upload-url')
  @UseGuards(JwtAuthGuard)
  async getUploadUrl(@Body() dto: GenerateUrlDto) {
    const result = await this.generateUploadUrlUseCase.execute(
      dto.fileName,
      dto.contentType,
    );

    return {
      success: true,
      data: result,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() dto: UploadDocumentDto,
    @CurrentUser() user: IUserIdentity,
  ) {
    const result = await this.createDocumentUseCase.execute(dto, user.id);

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
