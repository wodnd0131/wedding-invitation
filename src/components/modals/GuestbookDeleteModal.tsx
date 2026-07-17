'use client';

import { useState } from 'react';
import { Modal } from '@/design-system';
import { deleteGuestbookEntry } from '@/lib/firestore';
import { sha256 } from '@/lib/hash';

interface GuestbookDeleteModalProps {
  isOpen: boolean;
  entryId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function GuestbookDeleteModal({ isOpen, entryId, onClose, onSuccess }: GuestbookDeleteModalProps) {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const ready = password.trim().length > 0;

  const reset = () => {
    setPassword('');
    setError('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!ready || submitting || !entryId) return;
    setSubmitting(true);
    setError('');
    try {
      const passwordHash = await sha256(password);
      await deleteGuestbookEntry(entryId, passwordHash);
      reset();
      onSuccess();
      onClose();
    } catch {
      setError('비밀번호가 일치하지 않습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="방명록 삭제">
      <div className="mb-[26px]">
        <label htmlFor="guestbook-delete-password" className="mb-2.5 block text-[13px] text-ink">
          비밀번호<span className="ml-0.5 text-wine">*</span>
        </label>
        <input
          id="guestbook-delete-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-line bg-white px-[14px] py-3 font-serif-kr text-[13.5px] text-ink focus:border-wine focus:outline-none"
        />
      </div>

      {error && <div className="mb-3 text-center text-[12px] text-wine">{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={!ready || submitting}
        className={`w-full border-none py-[14px] text-center text-[14px] tracking-[0.06em] text-white transition-colors ${
          ready && !submitting ? 'cursor-pointer bg-wine' : 'cursor-not-allowed bg-line'
        }`}
      >
        {submitting ? '삭제 중...' : '삭제하기'}
      </button>
    </Modal>
  );
}
