import { GetDocumentsQueryDto } from '../../application/dtos/get-documents-query.dto';
import { DocumentSummaryQuery } from '../../application/queries/document-summary.query';

export interface IDocumentQueryRepository {
  findAll(
    filters: GetDocumentsQueryDto & {
      skip: number;
      take: number;
      currentUserId?: string;
    },
  ): Promise<[DocumentSummaryQuery[], number]>;
}
