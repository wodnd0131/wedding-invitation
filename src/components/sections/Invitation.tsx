'use client';

import { useState } from 'react';
import ContactModal from '@/components/modals/ContactModal';
import { SectionHeading, OutlineButton } from '@/design-system';
import { invitationData } from '@/data/invitation';

export default function Invitation() {
  const [contactOpen, setContactOpen] = useState(false);
  const { groom, bride } = invitationData;

  return (
    <section className="reveal py-16 px-7">
      <SectionHeading eyebrow="Invitation" title="소중한 분들을 초대합니다" />
      <p className="mb-5 text-center text-[14.5px] leading-[2] text-ink">
        저희 두 사람의 작은 만남이<br />
        진실한 사랑으로 꽃피어<br />
        오늘 이 자리를 빛내는 결혼식으로 이어졌습니다.
      </p>
      <p className="mb-5 text-center text-[14.5px] leading-[2] text-ink">
        평생 서로를 귀히 여기며<br />
        처음의 설렘과 순수함을 잃지 않고<br />
        존중하고 아껴 나가겠습니다.
      </p>
      <div className="mt-9 flex items-center justify-center gap-[22px] text-center text-[13.5px] text-ink-soft">
        <div>
          {groom.father} · {groom.mother}의 아들
          <span className="mt-0.5 block text-[16px] font-medium text-ink">{groom.name}</span>
        </div>
        <span className="font-garamond text-[22px] italic text-gold">&amp;</span>
        <div>
          {bride.father} · {bride.mother}의 딸
          <span className="mt-0.5 block text-[16px] font-medium text-ink">{bride.name}</span>
        </div>
      </div>
      <OutlineButton onClick={() => setContactOpen(true)} className="mx-auto mt-8 block w-[180px] py-[13px]">
        연락하기
      </OutlineButton>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
