'use client';

import { useParams } from 'next/navigation';

import { DocumentDetail } from '@/modules/document/components/document-detail';
import { useDocument } from '@/modules/document/hooks/use-document';

export default function DocumentDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: document,
    isLoading,
    isError,
  } = useDocument(id);

  if (isLoading) {
    return (
      <div className="container py-8">
        Loading document...
      </div>
    );
  }

  if (isError || !document) {
    return (
      <div className="container py-8">
        Document not found.
      </div>
    );
  }

  return (
    <DocumentDetail
      document={document}
    />
  );
}