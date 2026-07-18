'use client';

import { useState } from 'react';
import { Modal } from '@/design-system';
import { addGuestbookEntry } from '@/lib/firestore';
import { sha256 } from '@/lib/hash';

interface GuestbookWriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function GuestbookWriteModal({ isOpen, onClose, onSuccess }: GuestbookWriteModalProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const MIN_MESSAGE_LENGTH = 8;
  const ready = name.trim().length > 0 && password.trim().length > 0 && message.trim().length >= MIN_MESSAGE_LENGTH;

  const reset = () => {
    setName('');
    setPassword('');
    setMessage('');
    setError('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!ready || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const passwordHash = await sha256(password);
      await addGuestbookEntry(name.trim(), message.trim(), passwordHash);
      reset();
      onSuccess();
      onClose();
    } catch {
      setError('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="방명록 작성">
      <div className="mb-[22px]">
        <label htmlFor="guestbook-name" className="mb-2.5 block text-[13px] text-ink">
          작성자 성함<span className="ml-0.5 text-wine">*</span>
        </label>
        <input
          id="guestbook-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 홍길동"
          className="w-full border border-line bg-white px-[14px] py-3 font-serif-kr text-[13.5px] text-ink focus:border-wine focus:outline-none"
        />
      </div>

      <div className="mb-[22px]">
        <label htmlFor="guestbook-password" className="mb-2.5 block text-[13px] text-ink">
          비밀번호<span className="ml-0.5 text-wine">*</span>
        </label>
        <input
          id="guestbook-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="방명록을 삭제할 때 사용됩니다"
          className="w-full border border-line bg-white px-[14px] py-3 font-serif-kr text-[13.5px] text-ink focus:border-wine focus:outline-none"
        />
      </div>

      <div className="mb-[26px]">
        <label htmlFor="guestbook-message" className="mb-2.5 block text-[13px] text-ink">
          방명록 내용<span className="ml-0.5 text-wine">*</span>
        </label>
        <textarea
          id="guestbook-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="신랑 신부의 결혼을 축하해주세요"
          rows={4}
          className="w-full resize-y border border-line bg-white px-[14px] py-3 font-serif-kr text-[13.5px] text-ink focus:border-wine focus:outline-none"
        />
        <div className="mt-1.5 text-right text-[11px] text-ink-soft">
          {message.trim().length} / 최소 {MIN_MESSAGE_LENGTH}자
        </div>
      </div>

      {error && <div className="mb-3 text-center text-[12px] text-wine">{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={!ready || submitting}
        className={`w-full border-none py-[14px] text-center text-[14px] tracking-[0.06em] text-white transition-colors ${
          ready && !submitting ? 'cursor-pointer bg-wine' : 'cursor-not-allowed bg-line'
        }`}
      >
        {submitting ? '등록 중...' : '확인'}
      </button>
    </Modal>
  );
}
