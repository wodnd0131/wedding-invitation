'use client';

import { ReactNode } from 'react';
import { Modal } from '@/design-system';
import { invitationData, ContactEntry } from '@/data/invitation';

function IconButton({ label, href, children }: { label: string; href?: string; children: ReactNode }) {
  const className =
    'flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border-none bg-panel text-wine transition-colors hover:bg-gold-soft hover:text-white';

  if (href) {
    return (
      <a aria-label={label} href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button aria-label={label} className={className}>
      {children}
    </button>
  );
}

function ContactGroup({
  title,
  en,
  contacts,
  isFirst,
}: {
  title: string;
  en: string;
  contacts: ContactEntry[];
  isFirst: boolean;
}) {
  return (
    <>
      <div
        className={`flex items-baseline gap-2 border-b border-wine pb-2 text-[13.5px] font-semibold text-ink ${
          isFirst ? '' : 'mt-[26px]'
        }`}
      >
        {title} <span className="font-garamond text-[11px] italic tracking-[0.08em] text-ink-soft">{en}</span>
      </div>
      {contacts.map((c, i) => (
        <div
          key={c.name}
          className={`flex items-center justify-between px-1 py-[13px] ${
            i < contacts.length - 1 ? 'border-b border-line' : ''
          }`}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-ink-soft">{c.role}</span>
            <span className="text-[14.5px] font-medium">{c.name}</span>
          </div>
          <div className="flex gap-2">
            <IconButton label="전화 걸기" href={c.phone ? `tel:${c.phone}` : undefined}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 2h2.5l1 3-1.5 1a8 8 0 0 0 4 4l1-1.5 3 1V12a1 1 0 0 1-1 1C6.5 13 3 9.5 3 3a1 1 0 0 1 0-1Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
            <IconButton label="문자 보내기" href={c.phone ? `sms:${c.phone}` : undefined}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M2 3h12v8H6l-3 2.5V11H2V3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </IconButton>
          </div>
        </div>
      ))}
    </>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { groom, bride } = invitationData.contacts;

  return (
    <Modal isOpen={isOpen} onClose={onClose} eyebrow="Contact" title="연락하기">
      <ContactGroup title="신랑측" en="GROOM" contacts={groom} isFirst />
      <ContactGroup title="신부측" en="BRIDE" contacts={bride} isFirst={false} />
    </Modal>
  );
}
