# 인프라 / 빌드 환경

## 스택 요약
| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | Next.js (App Router) + TypeScript | SSR로 카톡 공유 시 동적 OG 태그 생성 가능, Vercel과 궁합 좋음. 실제로는 16.2.10 사용 중 (최초 선택은 14) |
| 스타일 | Tailwind CSS v4 | 기존 HTML 목업의 CSS 변수 기반 디자인 시스템을 그대로 옮기기 쉬움 |
| DB | Firebase Firestore | 스키마 단순 + 트래픽 적음 → NoSQL 문서형이 자연스러움, 서버 코드 불필요 |
| 이미지 저장 | **AWS S3 (영구 공개 URL)** | Firebase Storage는 Blaze(과금) 플랜이 필요해 제외. S3는 이미 버킷 보유 + 무료 티어로 충분. 업로드 UI는 만들지 않고, 미리 발급받은 공개 객체 URL을 데이터 파일에 직접 채워 넣는 방식 |
| 배포 | Vercel | Next.js 네이티브 지원, 무료 티어로 충분 |
| 공유 | 링크 복사 | 최초엔 Kakao 공유 SDK였으나 링크 복사 버튼으로 대체됨 (12번 항목 참고) |

**서버(Spring Boot 등)는 이 프로젝트에서 사용하지 않음.** 모든 데이터 흐름은 클라이언트 → Firebase SDK 직접 호출.
**Firebase Storage는 사용하지 않음** — `firebase.ts`에 `getStorage()` 호출이나 관련 코드 없음.

## 프로젝트 구조
> 아래는 실제 구현 후 갱신된 최신 구조. About Us 섹션과 화환 기능은 이후 요청으로 제거됨.
```
app/
  page.tsx                    # 메인 청첩장 페이지 (전체 섹션 조합)
  layout.tsx                   # 메타데이터(OG 포함), 폰트 로드
  globals.css                  # Tailwind v4 @theme 디자인 토큰 + reveal/애니메이션 CSS
scripts/
  generate-invitation-data.js  # Vercel 빌드 시 INVITATION_DATA_JSON/INVITATION_IMAGES_JSON
                                # 환경변수로부터 invitation.data.ts/invitation.images.ts 생성 (prebuild)
src/
  data/
    invitation.types.ts         # 타입 정의만, git 커밋됨
    invitation.data.ts          # 실제 개인정보(이름/날짜/장소/계좌/연락처), gitignore, 커밋 안 됨
    invitation.data.example.ts  # 위 더미 값 템플릿, git 커밋됨
    invitation.images.ts        # 실제 이미지 URL, gitignore, 커밋 안 됨
    invitation.images.example.ts # 위 더미 값 템플릿, git 커밋됨
    invitation.ts                # 위 파일들을 조합하는 barrel export, 컴포넌트는 전부 이 경로로 import
  design-system/
    Divider.tsx                 # SVG 라인아트 디바이더
    SectionHeading.tsx           # eyebrow + 섹션 타이틀 패턴
    PlaceholderImage.tsx         # 이미지 자리표시자 (src 채우면 실제 <img>로 전환)
    OutlineButton.tsx
    Modal.tsx                    # 모달 셸 (Portal 기반)
    AccordionItem.tsx            # 계좌번호 아코디언
    index.ts                     # 배럴 export
  components/
    KakaoMap.tsx                 # 카카오맵 JS SDK 임베드 (주소 → Geocoder → 마커, 위치 확인용)
    KakaoInit.tsx                # Kakao JS SDK 초기화 (공유 기능은 제거됐지만 SDK 초기화 자체는 유지)
    sections/
      Hero.tsx, Invitation.tsx, WeddingDay.tsx, Location.tsx,
      Gallery.tsx, Guestbook.tsx, Account.tsx, RsvpWreath.tsx, Ending.tsx
    modals/
      ContactModal.tsx, RsvpModal.tsx, GuestbookWriteModal.tsx, GuestbookDeleteModal.tsx
  lib/
    firebase.ts                 # Firebase 초기화 (Firestore만, Storage 없음)
    firestore.ts                  # CRUD 함수 (guestbook, rsvp) — 실제로 연동되어 사용 중
    kakao.ts                      # Kakao SDK 초기화만 남음 (공유 함수는 제거됨)
    hash.ts                       # 방명록 비밀번호 SHA-256 해싱 (Web Crypto API)
    calendar.ts                   # 예식 날짜로부터 달력 그리드 자동 생성
    date.ts                       # 날짜 포맷 유틸
    map.ts                        # 주소 기반 네이버지도/카카오맵 딥링크 생성
  types/
    invitation.ts                 # Firestore 연동용 타입 (GuestbookEntry/RsvpResponse)
  hooks/
    useCountdown.ts               # 카운트다운 로직
    useScrollReveal.ts             # IntersectionObserver 훅
```

## 환경변수 (`.env.local`, 로컬 전용)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_KAKAO_JS_KEY=
NEXT_PUBLIC_SITE_URL=
```
`.env.local`은 `.gitignore`에 포함. (Storage 버킷 값은 Storage를 안 쓰므로 제거함)

## Vercel 배포 환경변수
로컬 `.env.local` 항목 전부 + 아래 두 개를 Vercel 프로젝트 Settings → Environment Variables에 추가로 등록:
- `INVITATION_DATA_JSON` — 이름/날짜/장소/계좌/연락처 전체를 한 줄 JSON으로. `scripts/generate-invitation-data.js`가
  `prebuild` 단계에서 이 값으로 `src/data/invitation.data.ts`를 생성함 (git에 없는 파일이라 이게 없으면 빌드 실패)
- `INVITATION_IMAGES_JSON` — 이미지 URL(`hero`/`ending`/`og`/`gallery`)을 한 줄 JSON으로. 같은 방식으로
  `src/data/invitation.images.ts`를 생성함
- 로컬 개발 환경에서는 이 두 환경변수 없이 `invitation.data.ts`/`invitation.images.ts`를 직접 만들어 쓰면
  스크립트가 그냥 스킵됨 (기존 로컬 워크플로우 그대로 유지)

## Firestore 컬렉션 설계
```
guestbook/{entryId}
  - name: string
  - message: string
  - passwordHash: string (SHA-256, 삭제 시 대조용)
  - createdAt: timestamp

rsvp/{responseId}
  - name: string
  - side: 'groom' | 'bride'
  - attending: boolean
  - meal: boolean
  - createdAt: timestamp
```
청첩장이 하나뿐이라 `invitationId` 필드는 생략(단일 문서/컬렉션 구조로 단순화).
`gallery` 컬렉션은 만들지 않음 — 갤러리 이미지도 S3 영구 URL을 `invitation.images.ts`에 직접 채우는 방식으로 결정됨.

## Firestore 보안 규칙 (실제 적용됨, 2026-07-17)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guestbook/{entryId} {
      allow read: if true;
      allow create: if true;
      allow update: if false;
      allow delete: if true;
    }
    match /rsvp/{responseId} {
      allow read: if false;
      allow create: if true;
      allow update, delete: if false;
    }
  }
}
```
**알려진 한계**: `guestbook`의 `delete: if true`는 사실상 전체 공개 — 삭제 시 비밀번호 대조는 앱 UI
레벨(`GuestbookDeleteModal` → 해시 비교 후 삭제 호출)에서만 이루어지고, 규칙 자체로는 강제할 방법이
없음(삭제 요청엔 비밀번호를 실어 보낼 수 없어서). 서버 코드 없이 가능한 최선으로 판단하고 감수하기로 함.

## S3 이미지
- 업로드 UI는 만들지 않음. 미리 발급받은 **영구 공개 객체 URL**(예:
  `https://버킷명.s3.ap-northeast-2.amazonaws.com/image/main.jpg`)을 `invitation.images.ts`에
  직접 채워 넣는 방식
- **주의**: 프리사인 URL(만료 있는 서명 URL)은 쓰면 안 됨 — 청첩장은 결혼식까지 몇 달간 떠 있어야 하는데
  프리사인 URL은 보통 최대 7일 안에 만료되어 이미지가 깨짐. 버킷/객체를 public-read로 설정한 영구 URL만 사용
- 이미지 슬롯: `hero`(메인), `ending`(마지막 사진), `og`(공유 미리보기, 1200×630 권장), `gallery`(배열, 개수 자유)
- `groomProfile`/`brideProfile` 슬롯은 타입에 남아있지만 About Us 섹션 삭제로 현재 아무 데도 안 쓰임 (정리 대상)

## Kakao 설정
- Kakao Developers 콘솔 > 플랫폼 > Web에 **실제 배포 도메인 등록 필수** (로컬 `file://`나 미등록 도메인에선 SDK 작동 안 함)
- 공유 기능(`shareKakao`)은 제거되어 현재는 SDK 초기화(`initKakao`/`KakaoInit`)만 사용 — 나중에 다른 용도로
  Kakao SDK가 필요해지면 그때 다시 활용
- 카카오맵(Maps) 제품은 비즈니스 앱 심사 대기 중이라 아직 비활성 — 심사 통과 후 콘솔에서 지도 제품 활성화 +
  도메인 등록하면 `src/components/KakaoMap.tsx`가 바로 동작함 (코드 변경 불필요)

## 배포 체크리스트
- [x] Firebase 프로젝트 생성, Firestore 활성화 + 보안 규칙 적용 (Storage는 사용 안 함)
- [ ] Vercel 프로젝트 연결, 환경변수 전부 등록 (`INVITATION_DATA_JSON`/`INVITATION_IMAGES_JSON` 포함)
- [ ] Kakao Developers에 배포 도메인 등록
- [ ] Kakao Maps 비즈 심사 통과 후 지도 제품 활성화 + 도메인 등록
- [ ] `NEXT_PUBLIC_SITE_URL`을 실제 배포 주소로 확정 (현재 `https://wedding-invitation-one-kohl.vercel.app`)
