export interface CategoryDto {
  id: string;
  name: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CategoryTreeDto {
  id: string;
  name: string;
  parentId?: string | null;
  children: CategoryTreeDto[];
}