'use client';

import { useState } from 'react';
import { PlaceholderImage, SectionHeading } from '@/design-system';
import { GalleryLightbox } from '@/components/GalleryLightbox';
import { invitationData } from '@/data/invitation';

export default function Gallery() {
  const { gallery } = invitationData.images;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="reveal bg-panel py-16 px-7">
      <SectionHeading eyebrow="Gallery" title="갤러리" />
      <div className="reveal-group grid grid-cols-3 gap-1.5">
        {gallery.map((photo, i) =>
          photo?.thumb ? (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="reveal-child aspect-square cursor-pointer border-none bg-transparent p-0"
            >
              <PlaceholderImage label="" src={photo.thumb} alt={`갤러리 사진 ${i + 1}`} className="h-full w-full" />
            </button>
          ) : (
            <PlaceholderImage key={i} label="" className="reveal-child aspect-square" />
          )
        )}
      </div>

      {openIndex !== null && (
        <GalleryLightbox images={gallery} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      )}
    </section>
  );
}
