'use client';

import { useState } from 'react';
import { Modal } from '@/design-system';
import { GuestbookEntry } from '@/types/invitation';

const PAGE_SIZE = 10;

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

interface GuestbookListModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: GuestbookEntry[];
  onDelete: (id: string) => void;
}

export default function GuestbookListModal({ isOpen, onClose, entries, onDelete }: GuestbookListModalProps) {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const pageEntries = entries.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE);

  const handleClose = () => {
    setPage(0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="방명록 전체보기">
      {entries.length === 0 ? (
        <div className="py-6 text-center text-[12.5px] text-ink-soft">아직 작성된 방명록이 없습니다.</div>
      ) : (
        <>
          <div>
            {pageEntries.map((entry) => (
              <div key={entry.id} className="border-b border-line py-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[13.5px] font-semibold">from. {entry.name}</span>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="cursor-pointer border-none bg-transparent text-[11px] text-ink-soft underline underline-offset-2"
                  >
                    삭제
                  </button>
                </div>
                <div className="mb-1.5 text-[12.5px] leading-[1.8] text-ink-soft">{entry.message}</div>
                <div className="text-[11px] text-[#B8AF9F]">{formatDate(entry.createdAt)}</div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                aria-label="이전 페이지"
                className="flex h-8 w-8 cursor-pointer items-center justify-center border-none bg-transparent text-ink-soft disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 4L7 12L15 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-[12px] tracking-[0.05em] text-ink-soft">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                aria-label="다음 페이지"
                className="flex h-8 w-8 cursor-pointer items-center justify-center border-none bg-transparent text-ink-soft disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 4L17 12L9 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
