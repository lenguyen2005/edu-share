export interface CategoryTreeDto {
  id: string;
  name: string;
  parentId: string | null;
  children: CategoryTreeDto[];
}
