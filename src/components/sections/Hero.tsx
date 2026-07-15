'use client';

import { PlaceholderImage } from '@/design-system';
import { invitationData } from '@/data/invitation';

export default function Hero() {
  const { weddingDate, groom, bride, venue, images } = invitationData;
  const year = weddingDate.getFullYear() % 100;
  const month = String(weddingDate.getMonth() + 1).padStart(2, '0');
  const date = String(weddingDate.getDate()).padStart(2, '0');

  return (
    <div className="relative">
      <div className="load-in d1 relative mx-5 mt-5 border border-gold-soft p-1.5">
        <PlaceholderImage
          className="aspect-[4/5] font-garamond text-[15px] tracking-[0.05em]"
          src={images.hero}
          alt="메인 사진"
          label={
            <>
              메인 사진을<br />여기에 넣어주세요<br />(4:5 비율 권장)
            </>
          }
        />
        <div className="load-in d2 absolute right-[-6px] top-0 border border-gold-soft bg-ivory px-2.5 py-3.5 text-center font-garamond leading-none text-wine">
          <span className="mb-2.5 block text-[34px] font-medium">{year}</span>
          <span className="mb-2.5 block text-[34px] font-medium">{month}</span>
          <span className="block text-[34px] font-medium">{date}</span>
        </div>
      </div>
      <div className="load-in d3 mt-7 text-center text-[18px]">
        <span className="mr-1 font-garamond text-[15px] italic text-wine-soft">groom.</span>
        {groom.name}
        <span className="mx-3.5 text-gold">|</span>
        <span className="mr-1 font-garamond text-[15px] italic text-wine-soft">bride.</span>
        {bride.name}
      </div>
      <div className="load-in d4 mt-2.5 text-center text-[13px] tracking-[0.03em] text-ink-soft">
        {venue.name}
      </div>
      <div className="h-9" />
    </div>
  );
}
