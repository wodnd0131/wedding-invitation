'use client';

import { Fragment } from 'react';
import { SectionHeading } from '@/design-system';
import { KakaoMap } from '@/components/KakaoMap';
import { invitationData } from '@/data/invitation';
import { buildMapLinks } from '@/lib/map';

export default function Location() {
  const { venue } = invitationData;
  const mapLinks = buildMapLinks(venue.address);

  return (
    <section className="reveal py-16 px-7">
      <SectionHeading eyebrow="Location" title="오시는 길" />

      <div className="mb-1.5 text-center text-[16px] font-semibold">{venue.name}</div>
      <div className="mb-6 text-center text-[12.5px] text-ink-soft">{venue.address}</div>

      <KakaoMap address={venue.address} name={venue.name} className="mb-5 h-[200px]" />

      <div className="flex gap-2">
        {mapLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
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
