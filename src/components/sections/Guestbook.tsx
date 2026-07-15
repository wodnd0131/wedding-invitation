'use client';

import { OutlineButton, SectionHeading } from '@/design-system';

const entries = [
  {
    name: '한지은',
    message: '맑고 따뜻한 사랑이 언제나 이어지길 바랍니다. 앞으로도 행복하세요.',
    date: '2025-04-24',
  },
  {
    name: '송하윤',
    message: '결혼 진심으로 축하해요, 서로의 단짝 친구이자 사랑이 되길.',
    date: '2025-04-24',
  },
];

export default function Guestbook() {
  return (
    <section className="reveal py-16 px-7">
      <SectionHeading eyebrow="Guestbook" title="방명록" />
      <OutlineButton variant="gold" className="mx-auto mb-[30px] block w-[140px] py-[11px]">
        작성하기
      </OutlineButton>

      <div className="reveal-group">
        {entries.map((entry) => (
          <div key={entry.name} className="reveal-child border-b border-line py-4">
            <div className="mb-1.5 text-[13.5px] font-semibold">from. {entry.name}</div>
            <div className="mb-1.5 text-[12.5px] leading-[1.8] text-ink-soft">{entry.message}</div>
            <div className="text-[11px] text-[#B8AF9F]">{entry.date}</div>
          </div>
        ))}
      </div>
      <a href="#" className="mt-[22px] block text-center text-[12.5px] tracking-[0.05em] text-wine underline underline-offset-4">
        더보기
      </a>
    </section>
  );
}
