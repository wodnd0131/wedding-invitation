'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { SectionHeading } from '@/design-system';
import { invitationData } from '@/data/invitation';
import { buildCalendarWeeks } from '@/lib/calendar';
import { formatWeddingDateLong } from '@/lib/date';

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

export default function WeddingDay() {
  const { weddingDate, groom, bride } = invitationData;
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);
  const weeks = buildCalendarWeeks(weddingDate);

  const getDaysLabel = () => {
    if (days > 0) return `${days}일`;
    if (hours > 0) return `${hours}시간`;
    if (minutes > 0) return `${minutes}분`;
    return '곧 시작됩니다';
  };

  const countdownBoxes = [
    { n: days, l: 'DAYS' },
    { n: hours, l: 'HOUR' },
    { n: minutes, l: 'MIN' },
    { n: seconds, l: 'SEC' },
  ];

  return (
    <section className="reveal py-16 px-7">
      <SectionHeading eyebrow="Wedding Day" />
      <div className="mb-[30px] text-center text-[16px] text-wine">{formatWeddingDateLong(weddingDate)}</div>

      <div className="mx-auto max-w-[320px]">
        <div className="mb-3 grid grid-cols-7 text-center text-[12.5px] tracking-[0.05em] text-ink-soft">
          {weekdays.map((w) => (
            <div key={w}>{w}</div>
          ))}
        </div>
        {weeks.map((week, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-7 text-center text-[12.5px]">
            {week.map((cell, colIdx) => {
              if (cell.marked) {
                return (
                  <div key={colIdx} className="py-[7px] text-ink">
                    <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-full bg-wine text-white">
                      {cell.day}
                    </span>
                  </div>
                );
              }
              return (
                <div key={colIdx} className={`py-[7px] ${cell.muted ? 'text-[#CBC1B2]' : 'text-ink'}`}>
                  {cell.day}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-9 flex justify-center gap-2.5">
        {countdownBoxes.map((box) => (
          <div key={box.l} className="w-16 border border-line bg-white py-3 text-center">
            <div className="font-garamond text-[24px] font-semibold text-wine">{String(box.n).padStart(2, '0')}</div>
            <div className="mt-1 text-[9.5px] tracking-[0.1em] text-ink-soft">{box.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-[18px] text-center text-[12.5px] text-ink-soft">
        {groom.name} ❤ {bride.name}의 결혼식이 <strong className="text-wine">{getDaysLabel()}</strong> 남았습니다.
      </div>
    </section>
  );
}
