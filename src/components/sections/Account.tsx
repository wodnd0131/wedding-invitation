'use client';

import { useState } from 'react';
import { AccordionItem, SectionHeading } from '@/design-system';
import { invitationData, AccountEntry } from '@/data/invitation';

interface AccountRowProps {
  entry: AccountEntry;
  id: string;
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
}

function AccountRow({ entry, id, copiedId, onCopy }: AccountRowProps) {
  const copied = copiedId === id;
  const bankText = `${entry.bankName} ${entry.accountNumber}`;
  return (
    <div className="flex items-center justify-between border-t border-line px-[18px] py-3 text-[12.5px]">
      <span className="w-14 shrink-0 text-ink-soft">{entry.name}</span>
      <span className="flex-1 text-right tracking-[0.01em] text-ink">{bankText}</span>
      <button
        onClick={() => onCopy(id, bankText)}
        aria-label="계좌번호 복사"
        className={`ml-2.5 flex h-[26px] w-[26px] shrink-0 cursor-pointer items-center justify-center border bg-transparent transition-colors ${
          copied ? 'border-wine bg-panel text-wine' : 'border-line text-ink-soft hover:border-wine hover:text-wine'
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M11 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
    </div>
  );
}

export default function Account() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { groom, bride } = invitationData.accounts;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((cur) => (cur === id ? null : cur));
      }, 1200);
    });
  };

  return (
    <section className="reveal bg-panel py-16 px-7">
      <SectionHeading eyebrow="Account" title="마음 전하는 곳" />
      <div className="mb-8 text-center text-[12.5px] leading-[1.9] text-ink-soft">
        참석이 어려우신 분들을 위해<br />
        계좌번호를 안내해 드립니다.<br />
        보내주신 마음 잘 간직하며 살겠습니다.
      </div>

      <div className="reveal-group flex flex-col gap-3.5">
        <div className="reveal-child">
          <AccordionItem title="신랑측 계좌번호">
            {groom.map((entry, i) => (
              <AccountRow key={entry.name} entry={entry} id={`groom-${i}`} copiedId={copiedId} onCopy={handleCopy} />
            ))}
          </AccordionItem>
        </div>
        <div className="reveal-child">
          <AccordionItem title="신부측 계좌번호">
            {bride.map((entry, i) => (
              <AccountRow key={entry.name} entry={entry} id={`bride-${i}`} copiedId={copiedId} onCopy={handleCopy} />
            ))}
          </AccordionItem>
        </div>
      </div>
    </section>
  );
}
