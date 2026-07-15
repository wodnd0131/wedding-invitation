'use client';

import { ReactNode, useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-line bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-center gap-2 border-none bg-transparent px-[18px] py-4 font-garamond text-[14.5px] italic tracking-[0.04em] text-wine-soft"
      >
        {title}
        <span
          className={`inline-flex text-gold transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height] duration-[350ms] ease-in-out"
        style={{ maxHeight: open ? '400px' : '0px' }}
      >
        {children}
      </div>
    </div>
  );
}
