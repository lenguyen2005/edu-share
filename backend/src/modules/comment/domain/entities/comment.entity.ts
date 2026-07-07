import { CommentAlreadyResolvedException } from '../exceptions/comment-already-resolved.exception';
import { CommentContentInvalidException } from '../exceptions/comment-content-invalid.exception';
import { CommentNotResolvedException } from '../exceptions/comment-not-resolved.exception';

export interface CommentProps {
  id: string;

  content: string;

  documentId: string;

  userId: string;

  parentId?: string | null;

  isResolved?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class CommentEntity {
  readonly id: string;

  content: string;

  readonly documentId: string;

  readonly userId: string;

  readonly parentId: string | null;

  isResolved: boolean;

  readonly createdAt: Date;
  readonly updatedAt?: Date;
  readonly deletedAt?: Date | null;

  constructor(props: CommentProps) {
    this.id = props.id;
    this.content = props.content;

    this.documentId = props.documentId;
    this.userId = props.userId;

    this.parentId = props.parentId ?? null;

    this.isResolved = props.isResolved ?? false;

    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.validateContent();
  }

  public edit(content: string): void {
    this.content = content;
    this.validateContent();
  }

  public resolve(): void {
    if (this.isResolved) {
      throw new CommentAlreadyResolvedException();
    }

    this.isResolved = true;
  }

  public reopen(): void {
    if (!this.isResolved) {
      throw new CommentNotResolvedException();
    }

    this.isResolved = false;
  }

  public isReply(): boolean {
    return this.parentId !== null;
  }

  private validateContent(): void {
    if (!this.content || this.content.trim().length < 3) {
      throw new CommentContentInvalidException();
    }
  }
}
