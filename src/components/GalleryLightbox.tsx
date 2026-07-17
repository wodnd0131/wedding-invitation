'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { GalleryImage } from '@/data/invitation';

interface GalleryLightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({ images, index, onClose, onNavigate }: GalleryLightboxProps) {
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const goPrev = () => {
    setDirection('prev');
    onNavigate((index - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setDirection('next');
    onNavigate((index + 1) % images.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  const current = images[index];

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90" onClick={onClose}>
      <button
        onClick={onClose}
        aria-label="닫기"
        className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center border-none bg-transparent text-white"
      >
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
          <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="이전 사진"
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent text-white"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M15 4L7 12L15 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <img
        key={index}
        src={current.full || current.thumb}
        alt={`갤러리 사진 ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[85vh] max-w-[90vw] object-contain ${
          direction === 'next' ? 'animate-lightbox-slide-right' : 'animate-lightbox-slide-left'
        }`}
      />

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="다음 사진"
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent text-white"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M9 4L17 12L9 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] tracking-[0.05em] text-white/80">
          {index + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
}
