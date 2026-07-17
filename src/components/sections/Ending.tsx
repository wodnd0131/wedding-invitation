'use client';

import { PlaceholderImage } from '@/design-system';
import { shareKakao } from '@/lib/kakao';
import { invitationData } from '@/data/invitation';

export default function Ending() {
  const { images } = invitationData;

  return (
    <section className="reveal pb-[70px] pt-10 text-center">
      <p className="mb-8 px-7 text-[16px] leading-[2] text-ink">
        저희의 새로운 시작을<br />
        함께 해주셔서 감사합니다.
      </p>

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
        className="mb-[34px] h-[368px] text-[13px]"
        src={images.ending}
        alt="마지막 사진"
        label={
          <>
            마지막 사진을<br />여기에 넣어주세요
          </>
        }
      />

      <div className="px-7">
        <div className="mx-auto mb-5 h-px w-12 bg-gold-soft" />
        {/* e-names(이름 표시)는 목업 원본에서도 주석 처리된 상태 — "루시드 아이콘 같은걸로 이쁘게만들기" 메모 참고, 추후 아이콘 확정 시 노출 */}

        <button
          onClick={shareKakao}
          className="mx-auto mt-10 flex w-[230px] cursor-pointer items-center justify-center gap-2 border-none bg-[#FEE500] py-[13px] text-center text-[13px] font-medium tracking-[0.02em] text-[#3A1D1D]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1.5C4.13 1.5 1 4.02 1 7.13c0 2 1.32 3.75 3.3 4.77-.15.52-.53 1.86-.61 2.15-.1.36.13.36.28.26.11-.08 1.8-1.22 2.53-1.72.48.07.98.11 1.5.11 3.87 0 7-2.52 7-5.63S11.87 1.5 8 1.5Z"
              fill="#3A1D1D"
            />
          </svg>
          카카오톡으로 공유하기
        </button>
        <div className="mt-[26px] text-center text-[10.5px] tracking-[0.04em] text-[#B8AF9F]">
          © 2026 WEDDING INVITATION
        </div>
      </div>
    </section>
  );
}
