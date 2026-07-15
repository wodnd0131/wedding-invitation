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
> 아래는 실제 구현 후 갱신된 최신 구조 (최초 설계안과 다름 — `ui/`는 `design-system/`으로 대체, `data/`
> 신설, `modals/` 별도 분리). Next.js 버전도 실제로는 16.2.10 사용 중 (최초 선택은 14).
```
app/
  page.tsx                    # 메인 청첩장 페이지 (전체 섹션 조합)
  layout.tsx                   # 메타데이터(OG 포함), 폰트 로드
  globals.css                  # Tailwind v4 @theme 디자인 토큰 + reveal/애니메이션 CSS
src/
  data/
    invitation.ts               # 청첩장 전체 데이터(이름/날짜/장소/계좌/연락처/이미지 슬롯) 단일 config
  design-system/
    Divider.tsx                 # SVG 라인아트 디바이더
    SectionHeading.tsx           # eyebrow + 섹션 타이틀 패턴
    PlaceholderImage.tsx         # 이미지 자리표시자 (src 채우면 실제 <img>로 전환)
    OutlineButton.tsx
    Modal.tsx                    # 모달 셸 (Portal 기반)
    AccordionItem.tsx            # 계좌번호 아코디언
    index.ts                     # 배럴 export
  components/
    sections/
      Hero.tsx, Invitation.tsx, AboutUs.tsx, WeddingDay.tsx, Location.tsx,
      Gallery.tsx, Guestbook.tsx, Account.tsx, RsvpWreath.tsx, Ending.tsx
    modals/
      ContactModal.tsx, RsvpModal.tsx
    KakaoInit.tsx
  lib/
    firebase.ts                 # Firebase 초기화 (작성됨, 실제 프로젝트 연결/호출은 아직 없음)
    firestore.ts                 # CRUD 함수 (guestbook, gallery, rsvp) — 작성됨, 컴포넌트에서 미사용
    kakao.ts                     # Kakao SDK 초기화 + 공유 함수
    calendar.ts                  # 예식 날짜로부터 달력 그리드 자동 생성
    date.ts                      # 날짜 포맷 유틸
  types/
    invitation.ts                # Firestore 연동용 타입 (GuestbookEntry/RsvpResponse/GalleryPhoto 등)
  hooks/
    useCountdown.ts               # 카운트다운 로직
    useScrollReveal.ts             # IntersectionObserver 훅
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
  - meal: boolean          # RsvpModal에 이미 있는 필드, 스키마에 누락돼 있어 추가
  - guestCount: number
  - message?: string
  - createdAt: timestamp
```
청첩장이 하나뿐이라 `invitationId` 필드는 생략(단일 문서/컬렉션 구조로 단순화).

## 청첩장 데이터 (`src/data/invitation.ts`)
Firestore로 가지 않는 정적 콘텐츠(이름/날짜/장소/계좌/연락처/이미지 URL)는 `src/data/invitation.ts`
단일 config로 분리됨 (구현 상세는 `03-implementation.md` 참고). **주의**: 이 파일은 일반 소스 코드로
git에 커밋되므로, 실제 계좌번호·전화번호 등 민감정보를 채워 넣기 전에 그대로 커밋해도 괜찮을지
결정 필요 (비공개 저장소 여부, 필요 시 민감 필드만 환경변수/Firestore로 분리하는 방안 고려).

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
