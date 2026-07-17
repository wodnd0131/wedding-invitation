'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { PlaceholderImage, OutlineButton } from '@/design-system';
import { invitationData } from '@/data/invitation';

export default function Ending() {
  const { images } = invitationData;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.href;
    navigator.clipboard.writeText(siteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <section className="reveal pb-[70px] text-center">
      <div className="ending-wave h-[34px] w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 400 34" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-[200%]">
          <path
            d="M0 20 C 25 5, 75 5, 100 20 C 125 35, 175 35, 200 20 C 225 5, 275 5, 300 20 C 325 35, 375 35, 400 20 C 425 5, 475 5, 500 20 C 525 35, 575 35, 600 20 C 625 5, 675 5, 700 20 C 725 35, 775 35, 800 20 L 800 34 L 0 34 Z"
            fill="var(--color-gold-soft)"
            opacity="0.45"
          />
          <path
            d="M0 24 C 25 12, 75 12, 100 24 C 125 36, 175 36, 200 24 C 225 12, 275 12, 300 24 C 325 36, 375 36, 400 24 C 425 12, 475 12, 500 24 C 525 36, 575 36, 600 24 C 625 12, 675 12, 700 24 C 725 36, 775 36, 800 24 L 800 34 L 0 34 Z"
            fill="var(--color-wine)"
            opacity="0.3"
          />
        </svg>
      </div>

      <PlaceholderImage
        className="mb-[34px] h-[300px] text-[13px]"
        src={images.ending}
        alt="마지막 사진"
        label={
          <>
            마지막 사진을<br />여기에 넣어주세요
          </>
        }
      />

      <div className="px-7">
        <p className="mb-5 text-[14.5px] leading-[2] text-ink">
          저희의 새로운 시작을<br />
          함께 해주셔서 감사합니다.
        </p>
        <div className="mx-auto mb-5 h-px w-12 bg-gold-soft" />
        {/* e-names(이름 표시)는 목업 원본에서도 주석 처리된 상태 — "루시드 아이콘 같은걸로 이쁘게만들기" 메모 참고, 추후 아이콘 확정 시 노출 */}

        <OutlineButton onClick={handleCopyLink} className="mx-auto mt-10 block w-[200px] py-[13px]">
          링크 복사하기
        </OutlineButton>
        <div className="mt-[26px] text-center text-[10.5px] tracking-[0.04em] text-[#B8AF9F]">
          © 2026 WEDDING INVITATION
        </div>
      </div>

      {copied &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-x-0 bottom-10 z-[200] flex justify-center px-5">
            <div className="animate-modal-in border border-gold-soft bg-ink px-5 py-3 text-[12.5px] text-white">
              링크가 복사되었습니다
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
