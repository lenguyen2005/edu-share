'use client';

import { Calendar, User } from 'lucide-react';

import { DocumentDto } from '../types/document.dto';

import { DocumentViewer } from './document-viewer';
import { CommentSection } from '@/modules/comment/components/comment-section';
import { useAuthStore } from '@/modules/auth/store/use-auth-store';

interface DocumentDetailProps {
  document: DocumentDto;
}

export function DocumentDetail({
  document,
}: DocumentDetailProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      <header className="space-y-3">
        <h1 className="text-3xl font-bold">
          {document.title}
        </h1>

        {document.description && (
          <p className="text-slate-600">
            {document.description}
          </p>
        )}

        <div className="flex flex-wrap gap-6 text-sm text-slate-500">

          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {document.author.fullName}
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(document.createdAt).toLocaleDateString()}
          </div>

          <span>
            {document.status}
          </span>

        </div>
      </header>

      <DocumentViewer
        documentId={document.id}
      />

      <CommentSection
            documentId={document.id}
            currentUserId= {user?.id}
        />
    </div>
  );
}