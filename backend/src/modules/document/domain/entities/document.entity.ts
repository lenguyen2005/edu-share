import { DocumentStatus } from '../enum/document-status.enum';
import { Title } from '../value-objects/title.vo';
import { InvalidDocumentDataException } from '../exceptions/invalid-document-data.exception';
import { DocumentAlreadyPublishedException } from '../exceptions/document-already-published.exception';
import { CannotPublishArchivedDocumentException } from '../exceptions/cannot-publish-archived-document.exception';
import { DocumentAlreadyArchivedException } from '../exceptions/document-already-archived.exception';
import { DocumentNotFoundException } from '../exceptions/document-not-found.exception';

export class DocumentEntity {
  constructor(
    public readonly id: string,
    private title: Title,
    private description: string | null,
    private fileKey: string,
    private authorId: string,
    private categoryId: string,
    private status: DocumentStatus,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private deletedAt: Date | null,
  ) {
    this.validate();
  }

  private validate() {
    if (!this.fileKey) {
      throw new InvalidDocumentDataException('fileKey');
    }
    if (!this.authorId) {
      throw new InvalidDocumentDataException('authorId');
    }
    if (!this.categoryId) {
      throw new InvalidDocumentDataException('categoryId');
    }
  }

  static create(props: {
    id: string;
    title: string;
    description: string | null;
    fileKey: string;
    authorId: string;
    categoryId: string;
    status: DocumentStatus;
  }): DocumentEntity {
    return new DocumentEntity(
      props.id,
      new Title(props.title),
      props.description,
      props.fileKey,
      props.authorId,
      props.categoryId,
      props.status,
      new Date(),
      new Date(),
      null,
    );
  }

  // ===== Getter =====
  getTitle() {
    return this.title.getValue();
  }
  getDescription() {
    return this.description;
  }
  getFileKey() {
    return this.fileKey;
  }
  getAuthorId() {
    return this.authorId;
  }
  getCategoryId() {
    return this.categoryId;
  }
  getStatus() {
    return this.status;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getUpdatedAt() {
    return this.updatedAt;
  }
  getDeletedAt() {
    return this.deletedAt;
  }

  getProps() {
    return {
      id: this.id,
      title: this.title.getValue(),
      description: this.description,
      fileKey: this.fileKey,
      authorId: this.authorId,
      categoryId: this.categoryId,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  // ===== Business logic =====
  publish() {
    if (this.status === DocumentStatus.PUBLISHED) {
      throw new DocumentAlreadyPublishedException();
    }

    if (this.deletedAt) {
      throw new CannotPublishArchivedDocumentException();
    }

    this.status = DocumentStatus.PUBLISHED;
    this.touch();
  }

  archive() {
    if (this.deletedAt !== null) {
      throw new DocumentAlreadyArchivedException();
    }

    this.deletedAt = new Date();
    this.touch();
  }

  restore() {
    if (!this.deletedAt) {
      throw new DocumentNotFoundException();
    }

    this.deletedAt = null;
    this.touch();
  }

  updateInfo(title: string, description: string | null) {
    this.title = new Title(title);
    this.description = description;
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }
}
