'use client';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  eyebrow?: string;
  icon?: ReactNode;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, eyebrow, icon, title, children }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[rgba(20,16,13,0.55)] px-5 py-12"
      onClick={onClose}
    >
      <div
        className="animate-modal-in relative w-full max-w-[400px] border border-gold-soft bg-ivory px-6 pt-9 pb-[30px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-4 top-4 flex h-7 w-7 cursor-pointer items-center justify-center border-none bg-transparent text-ink-soft"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        {icon && <div className="mb-[18px] flex justify-center">{icon}</div>}
        {eyebrow && (
          <div className="mb-1 text-center font-garamond text-sm italic tracking-[0.15em] text-wine-soft">
            {eyebrow}
          </div>
        )}
        <div className="mb-7 text-center text-[19px] font-semibold">{title}</div>
        {children}
      </div>
    </div>,
    document.body
  );
}
