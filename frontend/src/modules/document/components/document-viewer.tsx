'use client';

import { Loader2 } from 'lucide-react';

import { useDocumentLink } from '../hooks/use-document-link';

interface DocumentViewerProps {
  documentId: string;
}

export function DocumentViewer({
  documentId,
}: DocumentViewerProps) {
  const {
    data: url,
    isLoading,
    isError,
  } = useDocumentLink(documentId);

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center rounded-lg border">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !url) {
    return (
      <div className="flex h-[700px] items-center justify-center rounded-lg border">
        <p className="text-sm text-slate-500">
          Unable to load document.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <iframe
        src={url}
        title="Document Viewer"
        className="h-[700px] w-full"
      />
    </div>
  );
}