'use client';

import { createPortal } from 'react-dom';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return createPortal(
    <div className="fixed inset-x-0 bottom-8 z-[200] flex justify-center px-5">
      <div className="animate-toast-in border border-gold-soft bg-ink px-5 py-3 text-center text-[12.5px] tracking-[0.02em] text-ivory">
        {message}
      </div>
    </div>,
    document.body
  );
}
