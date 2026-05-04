import { DocumentEntity } from '../entities/document.entity';

export interface DocumentFilters {
  skip?: number;
  take?: number;
  authorId?: string;
  categoryId?: string;
  search?: string;
  currentUserId?: string;
}

export interface IDocumentRepository {
  create(document: DocumentEntity): Promise<DocumentEntity>;
  update(document: DocumentEntity): Promise<DocumentEntity>;
  findById(id: string): Promise<DocumentEntity | null>;
  findAll(filters?: DocumentFilters): Promise<[DocumentEntity[], number]>;
  findByOwner(ownerId: string): Promise<DocumentEntity[]>;
  delete(id: string): Promise<void>;
}
