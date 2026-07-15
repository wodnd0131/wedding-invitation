'use client';

import { Fragment } from 'react';
import { PlaceholderImage, SectionHeading } from '@/design-system';
import { invitationData } from '@/data/invitation';

export default function Location() {
  const { venue } = invitationData;

  return (
    <section className="reveal py-16 px-7">
      <SectionHeading eyebrow="Location" title="오시는 길" />

      <div className="mb-1.5 text-center text-[16px] font-semibold">{venue.name}</div>
      <div className="mb-6 text-center text-[12.5px] text-ink-soft">{venue.address}</div>

      <PlaceholderImage
        className="mb-5 h-[200px] text-[12.5px]"
        label={
          <>
            지도가 여기에 표시됩니다<br />(네이버맵 API 연동 예정)
          </>
        }
      />

      <div className="flex gap-2">
        {venue.mapLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex-1 border border-line py-2.5 text-center text-[12px] text-ink no-underline"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-8">
        {venue.transit.map((item, i) => (
          <div
            key={item.label}
            className={`text-[12.5px] leading-[1.9] text-ink-soft ${i < venue.transit.length - 1 ? 'mb-[18px]' : ''}`}
          >
            <span className="mb-1 block text-[13px] font-semibold text-wine">{item.label}</span>
            {item.lines.map((line, li) => (
              <Fragment key={li}>
                {line}
                {li < item.lines.length - 1 && <br />}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
