'use client';

import { ReactNode } from 'react';
import { PlaceholderImage, SectionHeading } from '@/design-system';
import { invitationData, Person } from '@/data/invitation';
import { formatBirthDate } from '@/lib/date';

interface Profile {
  role: 'groom' | 'bride';
  relation: '아들' | '딸';
  photoLabel: ReactNode;
  photoSrc?: string;
  person: Person;
}

export default function AboutUs() {
  const { groom, bride, images } = invitationData;

  const profiles: Profile[] = [
    {
      role: 'groom',
      relation: '아들',
      photoLabel: (
        <>
          신랑<br />사진
        </>
      ),
      photoSrc: images.groomProfile,
      person: groom,
    },
    {
      role: 'bride',
      relation: '딸',
      photoLabel: (
        <>
          신부<br />사진
        </>
      ),
      photoSrc: images.brideProfile,
      person: bride,
    },
  ];

  return (
    <section className="reveal bg-panel py-16 px-7">
      <SectionHeading eyebrow="About Us" title="저희를 소개합니다" />
      <div className="reveal-group">
        {profiles.map((p) => (
          <div key={p.role} className="reveal-child mb-8 flex items-start gap-[18px] last:mb-0">
            <PlaceholderImage
              variant="compact"
              className="h-[120px] w-24 shrink-0 text-[11px]"
              label={p.photoLabel}
              src={p.photoSrc}
              alt={p.role === 'groom' ? '신랑 사진' : '신부 사진'}
            />
            <div>
              <div className="mb-1 font-garamond text-[13px] italic text-wine-soft">{p.role}</div>
              <div className="mb-2 text-[18px] font-semibold">{p.person.name}</div>
              <div className="text-[12.5px] leading-[1.9] text-ink-soft">
                {p.person.father} · {p.person.mother}의 {p.relation}<br />
                {formatBirthDate(p.person.birthDate)}<br />
                {p.person.mbti ?? 'MBTI'} · {p.person.interests ?? '#관심사'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
