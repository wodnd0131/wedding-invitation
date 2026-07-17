# 구현 사항 (인프라 세팅 완료 이후)

`wedding-invitation.html`이 완성된 디자인/마크업/CSS 원본. 아래는 이걸 Next.js 컴포넌트로
옮기면서 **실제로 동작하게 만들어야 하는 것들**만 정리 (Firebase 프로젝트 생성 등 인프라 작업 제외).

> 이 문서는 연락하기/계좌/RSVP 모달, Ending 물결 애니메이션이 반영된 최신 HTML 기준으로 업데이트됨.
> 화환 모달은 이후 요청으로 제거됨, 카카오톡 공유는 링크 복사 방식으로 대체됨.

## 1. 정적 → 컴포넌트 변환 (그대로 옮기기만 하면 되는 것)
- [x] `<style>` 내 CSS 변수(`:root`)를 `globals.css`로 이동 — Tailwind v4 `@theme` 블록으로 이전
- [x] 각 섹션을 `components/sections/*.tsx`로 분리 (구조는 `02-infra.md` 참고)
- [x] SVG 디바이더를 `<Divider />` 공통 컴포넌트로 추출 → `src/design-system/Divider.tsx`
- [x] 모달의 공통 오버레이 마크업을 `<Modal />` 공통 컴포넌트로 추출 → `src/design-system/Modal.tsx`
      (화환 모달은 이후 요청으로 기능 자체가 제거되어 현재는 연락하기/RSVP/방명록 작성·삭제 4개 모달만 사용)
- [ ] ~~폰트 로드를 `next/font`로 전환~~ → **보류로 결정.** `next/font/google`이 번들한 Noto Serif KR
      서브셋 데이터에 `korean`이 없어(`cyrillic/latin/latin-ext/vietnamese`만 존재) 전환 시 한글이
      깨질 위험 확인, 현재의 `<link>` 태그 방식 유지

## 2. 애니메이션 로직 (JS → React 훅)
- [x] 스크롤 리빌: `IntersectionObserver` 로직을 `useScrollReveal` 커스텀 훅으로 전환
      → `.reveal`, `.reveal-group` 클래스 토글 방식 그대로 가져가되, React ref 기반으로 재작성
- [x] 진입 애니메이션(`load-in` fadeInUp)과 Ending 물결 애니메이션(`waveFlow`)은 순수 CSS로 그대로 유지
- [x] `prefers-reduced-motion` 대응 유지 (물결 애니메이션 포함)

## 3. 카운트다운 & 캘린더
- [x] `useCountdown(weddingDate)` 훅으로 분리 — 언마운트 시 `clearInterval` 처리 포함
- [x] 캘린더 자동 생성 로직 완료 — `src/lib/calendar.ts`의 `buildCalendarWeeks(weddingDate)`가
      `weddingDate` 하나로부터 주간 그리드/이전달·다음달 음영/예식일 표시를 전부 계산

## 4. 방명록 (Guestbook) — 완료
- [x] Firestore 연동 완료 — `getGuestbookEntries()`로 최신순 목록 조회
- [x] "작성하기" 버튼 → `GuestbookWriteModal`(이름/비밀번호/내용 입력, `<Modal />` 재사용)
- [x] 작성 시 `addGuestbookEntry()`로 `guestbook` 컬렉션에 `create` (비밀번호는 SHA-256 해시로 저장, `src/lib/hash.ts`)
- [x] 항목별 "삭제" 버튼 → `GuestbookDeleteModal`에서 비밀번호 입력 → 해시 대조 후 `deleteGuestbookEntry()` 호출
- [x] 작성/삭제 성공 시 목록 자동 새로고침
- [x] 실제 Firestore로 작성 → 목록 반영 → 오답 비밀번호 거부 → 정답으로 삭제까지 동작 확인 완료 (2026-07-17)
- [ ] "더보기" 페이지네이션은 아직 버튼만 있고 미동작 (현재 `limit(20)` 한 번에 로드, 데이터 양 적어 당장 급하지 않음)
- [ ] **알려진 한계**: Firestore 규칙상 `guestbook`은 `delete: if true`(전체 허용)라, 브라우저 개발자도구로 직접
      호출하면 비밀번호 없이도 삭제 가능함. 비밀번호 대조는 앱 UI 레벨에서만 강제됨 — 서버 코드(Cloud Functions)
      없이는 완전히 막기 어려운 구조적 한계로 인지하고 감수하기로 함

## 5. RSVP (참석 의사 전달) — 완료
- [x] 모달 UI(신랑측/신부측 토글, 참석/불참석 토글, 성함 입력, 식사 여부 토글, 개인정보 동의 체크박스,
      조건부 활성화되는 제출 버튼) 완성
- [x] `handleSubmit`에서 `addRsvpResponse(name, side, attending, meal)` 호출하도록 연결 완료
- [x] `addRsvpResponse()` 시그니처에서 안 쓰이던 `guestCount`/`message` 제거, `meal: boolean` 추가
      (`RsvpResponse` 타입, `02-infra.md` 스키마에도 반영됨)
- [x] 제출 중 로딩 상태("전달 중...", 버튼 비활성화), 실패 시 에러 메시지 표시 추가
- [x] 실제 Firestore 제출 동작 확인 완료 (2026-07-17) — 단, `rsvp` 컬렉션은 규칙상 `read: false`라
      앱에서 직접 조회는 불가, 응답 확인은 Firebase 콘솔에서

## 6. 계좌번호 — UI/복사 기능 완성, 실제 데이터만 남음
현재 상태: 신랑측/신부측 그룹 단위 아코디언, 그룹 안에 본인+부모님 3명씩 row로 정리됨.
복사 버튼은 `navigator.clipboard.writeText()`로 실제 동작함 (복사 시 아이콘 색상 피드백 포함).
- [x] 아코디언 열림 상태를 `useState`로 관리
- [x] 계좌 데이터를 컴포넌트 밖으로 분리 → `invitationData.accounts`
- [x] **민감정보 분리 완료** — `src/data/invitation.ts`를 타입(`invitation.types.ts`, 커밋됨)과 실제 값
      (`invitation.data.ts`, `.gitignore` 처리되어 커밋 안 됨)으로 분리. 커밋되는 건 더미 값 템플릿
      (`invitation.data.example.ts`)뿐. Vercel 배포는 `INVITATION_DATA_JSON` 환경변수 + `prebuild`
      스크립트(`scripts/generate-invitation-data.js`)로 빌드 시점에 파일 생성
- [ ] 지금은 더미 계좌번호 → 실제 계좌 정보로 교체 (개발 작업 아님, 콘텐츠 수급 필요)

## 7. 화환 보내기 — 기능 제거됨
~~UI 완성, 실제 연결 미정~~ → 사용자 요청으로 액션 카드/모달(`WreathModal.tsx`)을 전부 삭제,
`RsvpWreath.tsx`에는 "참석 의사 전달" 카드만 남음. 재도입 필요 시 이 섹션부터 다시 설계.

## 8. 연락하기 — UI 완성, tel/sms 연결 완료, 실제 번호만 남음
현재 상태: 모달 UI(신랑측/신부측 각 3명, 전화/문자 아이콘 버튼) 완성. 전화·문자 버튼 둘 다 유지하기로 확정.
- [x] 전화 아이콘 → `tel:전화번호` 링크 연결 (`ContactEntry.phone`이 있을 때만 활성화)
- [x] 문자 아이콘 → `sms:전화번호` 링크 연결
- [x] 연락처 데이터를 컴포넌트 밖으로 분리 → `invitationData.contacts` (계좌와 동일 구조, 동일하게 민감정보 분리됨)
- [ ] 실제 연락처(전화번호) 입력 필요 — 지금은 `phone` 필드가 전부 비어 있어 버튼이 비활성 상태로 보임
      (개발 작업 아님, 콘텐츠 수급 필요)

## 9. 갤러리 — 방향 전환 완료 (Firebase Storage → S3)
방향 확정: **하객 업로드 기능은 만들지 않음.** Firebase Storage는 과금(Blaze 플랜) 문제로 제외하고,
S3에 미리 올려둔 사진의 **영구 공개 URL**을 데이터 파일에 직접 채우는 방식으로 결정 (프리사인 URL은
만료되므로 사용 불가 — `02-infra.md`의 "S3 이미지" 항목 참고).
- [x] 이미지 URL을 전용 파일 `src/data/invitation.images.ts`(gitignore, 실제 URL) /
      `invitation.images.example.ts`(템플릿, 커밋됨)로 분리 — `invitation.data.ts`(개인정보)와
      독립적으로 관리되고, Vercel 배포 시에도 `INVITATION_IMAGES_JSON` 환경변수로 별도 주입됨
- [x] `hero`/`ending`/`og`/`gallery`(배열, 개수 제한 없음) 슬롯 모두 URL 채우면 자동으로 `<img>`로
      전환됨 (`PlaceholderImage`)
- [x] Firebase Storage 관련 미사용 코드(`getStorage`, `getGalleryPhotos()`, `GalleryPhoto` 타입) 정리 완료
- [ ] "더보기" 클릭 시 라이트박스(전체화면 뷰어) 또는 페이지 이동으로 전체 갤러리 보기

## 10. Guest Album (하객이 올리는 사진) — 보류
- [ ] 목업에 자리는 잡혀있으나 미구현 상태. 9번 항목과 마찬가지로 하객 업로드 기능 자체를 만들지
      않기로 한 방향과 상충 — 이 섹션을 실제로 만들지 여부 자체를 다시 결정해야 함

## 11. 지도
- [x] 장소명/주소/교통 안내를 `invitationData.venue`로 분리
- [x] 지도 앱 링크 2개(네이버지도/카카오맵)를 주소 기반 검색 링크로 실제 연결 완료 (`src/lib/map.ts`의
      `buildMapLinks`). 티맵 버튼은 요청에 따라 제거됨
- [x] 카카오맵 JS SDK 임베드 코드 작성 완료 (`src/components/KakaoMap.tsx`) — 주소를 Geocoder로
      좌표 변환 후 마커 표시, 드래그/줌 비활성화(위치 확인 목적, 조작 편의성은 우선순위 아님)
- [ ] **막힘(외부 요인)**: Kakao Developers 콘솔에서 해당 앱의 "지도(Maps)" 제품이 카카오 비즈니스
      심사 대기 중이라 아직 비활성 상태. 심사 통과 후 콘솔에서 활성화 + 도메인(로컬/배포 도메인) 등록하면
      코드 변경 없이 바로 동작. 실패 시 자리표시자 문구로 자동 폴백하도록 이미 처리돼 있음

## 12. 공유하기 — 카카오톡 공유 → 링크 복사로 변경
- [x] Ending 섹션 최하단 버튼을 카카오톡 공유(`shareKakao`, 노란 배경 + 카카오 아이콘)에서
      링크 복사 버튼으로 교체 — 다른 버튼들과 동일한 `OutlineButton` 스타일 사용, 아이콘 없음
- [x] 클릭 시 `NEXT_PUBLIC_SITE_URL` 클립보드 복사 + 하단 플로팅 토스트("링크가 복사되었습니다") 표시
      (Modal과 동일하게 `createPortal`로 `document.body`에 렌더링 — `.reveal`의 transform에 안 잘림)
- [x] 더 이상 쓰이지 않는 `shareKakao()`는 `src/lib/kakao.ts`에서 제거. `initKakao()`/`KakaoInit`
      (SDK 초기화 자체)는 다른 용도로 남겨둠, 필요 없어지면 추가로 정리 가능
- [ ] 클립보드 복사 자체는 브라우저 프리뷰 자동화 환경에서 권한 문제로 최종 확인은 못함 (코드/스타일은
      확인됨) — 실 배포 환경에서 직접 눌러서 토스트까지 뜨는지 확인 필요

## 13. 반응형/접근성 마무리
- [ ] 480px 고정 폭 유지 여부 재확인 (데스크탑에서도 모바일처럼 보이게 의도된 디자인)
- [ ] 키보드 포커스 스타일 점검 (버튼, 아코디언, 모달 내부 폼 요소, 모달 간 포커스 트랩)
- [ ] 모달 열렸을 때 `Esc` 키로 닫히는 기능 추가 (현재는 오버레이 클릭 또는 X 버튼만 가능)
- [ ] 이미지 `alt` 텍스트 전체 점검

## 완료된 항목 (참고용 — 추가 작업 불필요)
- Timeline, Interview, About Us 섹션 제거 완료
- Tailwind v4 실제 연결 + `@theme` 디자인 토큰 추출 완료
- 전 섹션 Tailwind 전환 + `src/design-system/` 공통 프리미티브 분리 완료
- 스크롤 리빌 + 페이지 진입 애니메이션 완료
- 연락하기 모달 UI + tel/sms 연결 완료 (화환 모달은 제거됨)
- 계좌번호 그룹 아코디언 + 클립보드 복사 완료
- 캘린더/카운트다운을 `weddingDate` 하나로부터 자동 계산하도록 개선 완료
- Ending 섹션 물결 애니메이션(무한 루프, reduced-motion 대응) 완료
- **청첩장 데이터/이미지/타입 분리 완료** — `invitation.types.ts`(커밋) / `invitation.data.ts`(민감정보) /
  `invitation.images.ts`(이미지 URL) 둘 다 gitignore, 각각 `.example.ts` 템플릿 커밋됨 + Vercel용
  `prebuild` 스크립트가 `INVITATION_DATA_JSON`/`INVITATION_IMAGES_JSON` 두 환경변수로 두 파일 모두 생성
- **이미지 슬롯을 S3 영구 공개 URL로 채우는 구조 완료** — `PlaceholderImage`에 `src` prop 추가,
  Firebase Storage 의존성 없음
- **방명록 작성/삭제 Firestore 연동 완료 및 실동작 확인**
- **RSVP 제출 Firestore 연동 완료 및 실동작 확인**
- **오시는 길 지도 링크 + 카카오맵 임베드 코드 완료** (심사 대기 중)
- **공유하기를 링크 복사 방식으로 전환 완료**

## 채워야 할 콘텐츠 (개발과 별개, 결정 필요)
- 대표 사진(히어로/엔딩), OG 이미지, 갤러리 사진 → S3에 영구 공개 URL로 올린 뒤 `invitation.images.ts`에 채우면 됨
- 실제 계좌번호 (본인 + 양가 부모님, 총 6개) → `invitationData.accounts`
- 실제 연락처 (본인 + 양가 부모님, 총 6개) → `invitationData.contacts`
- 신랑/신부 MBTI, 관심사 해시태그 (현재 placeholder) → `invitationData.groom/bride`의 `mbti`/`interests`
- 안내사항(Information) 섹션 텍스트 — 목업엔 자리만 있고 내용 없음

## 남은 결정 사항
- 화환 보내기 기능을 다시 넣을지 여부 (7번 항목 참고, 현재는 완전히 제거된 상태)
- Guest Album(10번) 기능을 실제로 만들지 여부 — 9번의 "업로드 기능 없음" 방향과 상충
- Kakao Maps 비즈 심사 통과 후 콘솔 설정(제품 활성화 + 도메인 등록) — 코드는 준비 완료, 콘솔 작업만 남음
- `groomProfile`/`brideProfile` 이미지 슬롯 정리 여부 — About Us 섹션 삭제로 현재 아무 데도 안 쓰임
