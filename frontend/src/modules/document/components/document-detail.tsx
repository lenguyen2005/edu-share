'use client';

import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DocumentDto } from '../types/document.dto';
import { DocumentViewer } from './document-viewer';
import { CommentSection } from '@/modules/comment/components/comment-section';
import { useAuthStore } from '@/modules/auth/store/use-auth-store';
import { cn } from '@/lib/utils';

interface DocumentDetailProps {
  document: DocumentDto;
}

export function DocumentDetail({
  document,
}: DocumentDetailProps) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  return (
    // Nền tối được đẩy sáng lên một chút ở giữa (via-slate-900)
    <div className="relative min-h-screen w-full rounded-3xl bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-pink-50/80 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 md:p-10 shadow-sm dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white dark:border-slate-800 transition-colors duration-300 overflow-hidden">
      
      {/* Họa tiết trang trí (Decorations) - Tăng Opacity và Blur ở Dark Mode để tạo hiệu ứng Cực quang (Aurora) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-300 dark:bg-indigo-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-60 pointer-events-none transition-all duration-300"></div>
      <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-pink-300 dark:bg-fuchsia-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-30 dark:opacity-50 pointer-events-none transition-all duration-300"></div>

      <div className="mx-auto max-w-5xl space-y-10 relative z-10">
        
        {/* HEADER */}
        <header className="space-y-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800/80 px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 shadow-sm transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow hover:-translate-x-1 dark:border dark:border-slate-700"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại
          </button>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              {/* Text đổ bóng nhẹ để tách khỏi nền */}
              <h1 className="text-4xl md:text-5xl font-black text-indigo-700 dark:text-indigo-400 tracking-tight leading-tight transition-colors duration-300 dark:drop-shadow-sm">
                {document.title}
              </h1>
            </div>

            {document.description && (
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-3xl transition-colors duration-300">
                {document.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-300">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/80 px-4 py-2 rounded-full backdrop-blur-sm transition-colors duration-300 dark:border dark:border-slate-700/50 shadow-sm dark:shadow-none">
                <User className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                {document.author.fullName}
              </div>

              <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/80 px-4 py-2 rounded-full backdrop-blur-sm transition-colors duration-300 dark:border dark:border-slate-700/50 shadow-sm dark:shadow-none">
                <Calendar className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                {new Date(document.createdAt).toLocaleDateString('vi-VN')}
              </div>

              <div className={cn(
                "px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-sm dark:shadow-none transition-colors duration-300",
                document.status === 'PUBLISHED' 
                  ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 dark:border dark:border-purple-800/50" 
                  : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 dark:border dark:border-amber-800/50"
              )}>
                {document.status}
              </div>
            </div>
          </div>
        </header>

        {/* DOCUMENT VIEWER */}
        <div className="overflow-hidden rounded-3xl border-4 border-white/60 dark:border-slate-700/50 bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] ring-1 ring-slate-900/5 dark:ring-0 transition-all duration-300 relative z-20">
          <DocumentViewer documentId={document.id} />
        </div>

        {/* COMMENT SECTION WRAPPER - Tách biệt rõ ràng khỏi background */}
        <div className="rounded-3xl bg-white/80 dark:bg-[#111827]/90 backdrop-blur-xl p-6 md:p-8 shadow-sm dark:shadow-xl border border-white dark:border-slate-700/60 dark:ring-1 dark:ring-indigo-900/20 transition-all duration-300">
          <CommentSection
            documentId={document.id}
            currentUserId={user?.id}
          />
        </div>

      </div>
    </div>
  );
}