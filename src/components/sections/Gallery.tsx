'use client';

import { PlaceholderImage, SectionHeading } from '@/design-system';
import { invitationData } from '@/data/invitation';

export default function Gallery() {
  const { gallery } = invitationData.images;

  return (
    <section className="reveal bg-panel py-16 px-7">
      <SectionHeading eyebrow="Gallery" title="갤러리" />
      <div className="reveal-group grid grid-cols-3 gap-1.5">
        {gallery.map((url, i) => (
          <PlaceholderImage
            key={i}
            label=""
            src={url}
            alt={`갤러리 사진 ${i + 1}`}
            className="reveal-child aspect-square"
          />
        ))}
      </div>
      <a href="#" className="mt-[22px] block text-center text-[12.5px] tracking-[0.05em] text-wine underline underline-offset-4">
        더보기
      </a>
    </section>
  );
}
