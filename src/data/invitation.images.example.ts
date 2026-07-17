// 이미지 URL 템플릿.
// 사용법: 이 파일을 invitation.images.ts로 복사한 뒤 실제 이미지 URL로 채우세요.
// invitation.images.ts는 .gitignore 처리되어 있고, git에 커밋되지 않습니다.
// URL은 만료되지 않는 영구 공개 주소여야 합니다 (예: 공개 S3 객체 URL). 프리사인 URL처럼
// 시간 제한이 있는 주소를 넣으면 나중에 이미지가 깨집니다.
import { ImageSlots } from './invitation.types';

export const images: ImageSlots = {
  hero: 'https://example-bucket.s3.ap-northeast-2.amazonaws.com/image/main.jpg',
  ending: 'https://example-bucket.s3.ap-northeast-2.amazonaws.com/image/ending.jpg',
  og: 'https://example-bucket.s3.ap-northeast-2.amazonaws.com/image/og.jpg',
  gallery: [
    {
      thumb: 'https://example-bucket.s3.ap-northeast-2.amazonaws.com/image/gallery-1-thumb.jpg',
      full: 'https://example-bucket.s3.ap-northeast-2.amazonaws.com/image/gallery-1.jpg',
    },
    {
      thumb: 'https://example-bucket.s3.ap-northeast-2.amazonaws.com/image/gallery-2-thumb.jpg',
      full: 'https://example-bucket.s3.ap-northeast-2.amazonaws.com/image/gallery-2.jpg',
    },
  ],
};
