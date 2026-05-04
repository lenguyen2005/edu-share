import { InvalidCategoryNameException } from '../exceptions/invalid-category-name.exception';
import { CannotSetSelfAsParentException } from '../exceptions/cannot-set-self-as-parent.exception';
import { CategoryAlreadyArchivedException } from '../exceptions/category-already-archived.exception';

export class CategoryEntity {
  constructor(
    public readonly id: string,
    private name: string,
    private parentId: string | null,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private deletedAt: Date | null,
  ) {
    this.validate();
  }

  static create(props: {
    id: string;
    name: string;
    parentId?: string | null;
  }): CategoryEntity {
    return new CategoryEntity(
      props.id,
      props.name,
      props.parentId ?? null,
      new Date(),
      new Date(),
      null,
    );
  }

  private validate() {
    if (!this.name || this.name.trim().length < 2) {
      throw new InvalidCategoryNameException();
    }
  }

  // ===== Business Logic =====

  updateName(newName: string) {
    if (!newName || newName.trim().length < 2) {
      throw new InvalidCategoryNameException();
    }

    this.name = newName.trim();
    this.touch();
  }

  changeParent(newParentId: string | null) {
    if (newParentId === this.id) {
      throw new CannotSetSelfAsParentException();
    }

    this.parentId = newParentId;
    this.touch();
  }

  archive() {
    if (this.deletedAt !== null) {
      throw new CategoryAlreadyArchivedException();
    }

    this.deletedAt = new Date();
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }

  // ===== Getters =====
  getName() {
    return this.name;
  }
  getParentId() {
    return this.parentId;
  }
  getDeletedAt() {
    return this.deletedAt;
  }

  public getProps() {
    return {
      id: this.id,
      name: this.name,
      parentId: this.parentId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
