# 인프라 / 빌드 환경

## 스택 요약
| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | Next.js 14 (App Router) + TypeScript | SSR로 카톡 공유 시 동적 OG 태그 생성 가능, Vercel과 궁합 좋음 |
| 스타일 | Tailwind CSS | 기존 HTML 목업의 CSS 변수 기반 디자인 시스템을 그대로 옮기기 쉬움 |
| DB | Firebase Firestore | 스키마 단순 + 트래픽 적음 → NoSQL 문서형이 자연스러움, 서버 코드 불필요 |
| 파일 저장 | Firebase Storage | 갤러리/프로필 사진 업로드 |
| 배포 | Vercel | Next.js 네이티브 지원, 무료 티어로 충분 |
| 공유 | Kakao JS SDK | 카카오톡 공유하기 (feed 타입) |

**서버(Spring Boot 등)는 이 프로젝트에서 사용하지 않음.** 모든 데이터 흐름은 클라이언트 → Firebase SDK 직접 호출.

## 프로젝트 구조
```
src/
  app/
    page.tsx                 # 메인 청첩장 페이지 (전체 섹션 조합)
    layout.tsx                # 메타데이터, 폰트 로드
    globals.css                # CSS 변수(디자인 토큰), 리셋
  components/
    sections/
      Hero.tsx
      Invitation.tsx
      AboutUs.tsx
      WeddingDay.tsx           # 캘린더 + 카운트다운
      Location.tsx             # 지도 + 오시는 길
      Gallery.tsx
      Guestbook.tsx
      Account.tsx
      RsvpWreath.tsx           # 참석의사 전달 + 화환
      Ending.tsx
    ui/
      Divider.tsx               # SVG 라인아트 디바이더
      RevealSection.tsx         # 스크롤 리빌 애니메이션 wrapper
      AccordionItem.tsx         # 계좌번호 아코디언
  lib/
    firebase.ts                # Firebase 초기화
    firestore.ts                # CRUD 함수 (guestbook, gallery, rsvp)
    kakao.ts                    # Kakao SDK 초기화 + 공유 함수
  types/
    invitation.ts               # 타입 정의
  hooks/
    useCountdown.ts             # 카운트다운 로직
    useScrollReveal.ts           # IntersectionObserver 훅
```

## 환경변수 (`.env.local`)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_KAKAO_JS_KEY=12eda42f4f4f181c18dca5b43f8be4ec
NEXT_PUBLIC_SITE_URL=              # 배포 도메인 확정 후 채움
```
`.env.local`은 `.gitignore`에 포함.

## Firestore 컬렉션 설계
```
guestbook/{entryId}
  - name: string
  - message: string
  - password: string (해시 저장, 수정/삭제 인증용)
  - createdAt: timestamp

gallery/{photoId}
  - imageUrl: string
  - thumbnailUrl: string
  - uploadedAt: timestamp

rsvp/{responseId}
  - name: string
  - side: 'groom' | 'bride'
  - attending: boolean
  - guestCount: number
  - message?: string
  - createdAt: timestamp
```
청첩장이 하나뿐이라 `invitationId` 필드는 생략(단일 문서/컬렉션 구조로 단순화).

## Firestore 보안 규칙 방향
- `guestbook`, `rsvp`: 누구나 `create` 가능 / `update`, `delete`는 비밀번호 필드 대조 방식으로 제한
- `gallery`: 쓰기 시 파일 크기(예: 10MB 이하), 이미지 타입만 허용
- 읽기는 전체 공개

## Kakao 설정
- Kakao Developers 콘솔 > 플랫폼 > Web에 **실제 배포 도메인 등록 필수** (로컬 `file://`나 미등록 도메인에선 SDK 작동 안 함)
- `objectType: 'feed'`로 제목/설명/썸네일/링크 구성 (기존 HTML 목업의 `shareKakao()` 함수 참고)

## 배포 체크리스트
- [ ] Firebase 프로젝트 생성, Firestore/Storage 활성화 (콘솔 작업, 직접 진행)
- [ ] Vercel 프로젝트 연결, 환경변수 동일하게 등록
- [ ] Kakao Developers에 배포 도메인 등록
- [ ] `NEXT_PUBLIC_SITE_URL`, OG 이미지 URL을 실제 배포 주소로 교체
