export enum PointReason {
  UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT',

  ANSWER_ACCEPTED = 'ANSWER_ACCEPTED',
}

export interface PointHistory {
  id: string;

  amount: number;

  reason: PointReason;

  referenceId?: string | null;

  referenceType?: string | null;

  createdAt: string;
}

export interface PaginatedPointHistory {
  items: PointHistory[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}

export interface PointHistoryResponse {
  success: boolean;

  data: PaginatedPointHistory;
}
