'use client';

import { useCallback, useEffect, useState } from 'react';
import { OutlineButton, SectionHeading } from '@/design-system';
import { getGuestbookEntries } from '@/lib/firestore';
import { GuestbookEntry } from '@/types/invitation';
import GuestbookWriteModal from '@/components/modals/GuestbookWriteModal';
import GuestbookDeleteModal from '@/components/modals/GuestbookDeleteModal';

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [writeOpen, setWriteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      const list = await getGuestbookEntries();
      setEntries(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <section className="reveal py-16 px-7">
      <SectionHeading eyebrow="Guestbook" title="방명록" />
      <OutlineButton
        variant="gold"
        onClick={() => setWriteOpen(true)}
        className="mx-auto mb-[30px] block w-[140px] py-[11px]"
      >
        작성하기
      </OutlineButton>

      {!loading && entries.length === 0 && (
        <div className="py-6 text-center text-[12.5px] text-ink-soft">첫 방명록을 남겨주세요.</div>
      )}

      <div className="reveal-group">
        {entries.map((entry) => (
          <div key={entry.id} className="reveal-child border-b border-line py-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[13.5px] font-semibold">from. {entry.name}</span>
              <button
                onClick={() => setDeleteTarget(entry.id)}
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

      <a href="#" className="mt-[22px] block text-center text-[12.5px] tracking-[0.05em] text-wine underline underline-offset-4">
        더보기
      </a>

      <GuestbookWriteModal isOpen={writeOpen} onClose={() => setWriteOpen(false)} onSuccess={fetchEntries} />
      <GuestbookDeleteModal
        isOpen={deleteTarget !== null}
        entryId={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSuccess={fetchEntries}
      />
    </section>
  );
}
