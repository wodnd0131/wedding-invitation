# 구현 사항 (인프라 세팅 완료 이후)

`wedding-invitation.html`이 완성된 디자인/마크업/CSS 원본. 아래는 이걸 Next.js 컴포넌트로
옮기면서 **실제로 동작하게 만들어야 하는 것들**만 정리 (Firebase 프로젝트 생성 등 인프라 작업 제외).

> 이 문서는 연락하기/계좌/RSVP/화환 모달, Ending 물결 애니메이션이 반영된 최신 HTML 기준으로 업데이트됨.

## 1. 정적 → 컴포넌트 변환 (그대로 옮기기만 하면 되는 것)
- [x] `<style>` 내 CSS 변수(`:root`)를 `globals.css`로 이동 — Tailwind v4 `@theme` 블록으로 이전
- [x] 각 섹션을 `components/sections/*.tsx`로 분리 (구조는 `02-infra.md` 참고)
- [x] SVG 디바이더를 `<Divider />` 공통 컴포넌트로 추출 → `src/design-system/Divider.tsx`
- [x] 모달의 공통 오버레이 마크업을 `<Modal />` 공통 컴포넌트로 추출 → `src/design-system/Modal.tsx`
      (화환 모달은 이후 요청으로 기능 자체가 제거되어 현재는 연락하기/RSVP 2개 모달만 사용)
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
      `weddingDate` 하나로부터 주간 그리드/이전달·다음달 음영/예식일 표시를 전부 계산 (이전엔 9월
      달력이 좌표로 하드코딩되어 있어 날짜를 바꾸면 깨지는 상태였음)

## 4. 방명록 (Guestbook) — 신규 구현
- [ ] 목업엔 더미 데이터만 있음 → Firestore 연동으로 교체
- [ ] "작성하기" 버튼 클릭 시 이름/비밀번호/메시지 입력 모달 또는 인라인 폼 (다른 모달과 동일한 `<Modal />` 재사용 가능)
- [ ] 작성 시 Firestore `guestbook` 컬렉션에 `create`
- [ ] 목록은 최신순 정렬, "더보기" 클릭 시 페이지네이션 (또는 처음부터 전체 로드 — 데이터 양 적으므로 단순하게 가능)
- [ ] 비밀번호 대조 후 본인 글 삭제 가능하게

## 5. RSVP (참석 의사 전달) — UI 완성, 저장 로직 미구현
현재 상태: 모달 UI(신랑측/신부측 토글, 참석/불참석 토글, 성함 입력, 식사 여부 토글,
개인정보 동의 체크박스, 조건부 활성화되는 제출 버튼)까지 전부 완성.
- [x] 폼 상태를 React `useState`로 관리 (`side`/`attend`/`name`/`meal`/`agree`)
- [ ] `submitRsvp()`가 여전히 `alert()`만 띄우는 placeholder — `src/lib/firestore.ts`에
      `addRsvpResponse()` 함수는 이미 작성돼 있으나 어디서도 호출되지 않는 상태. `RsvpModal.tsx`의
      `handleSubmit`에서 이 함수를 호출하도록 연결 필요
- [ ] `addRsvpResponse()` 시그니처에 `meal: boolean` 파라미터 추가 필요 (현재 없음), `02-infra.md`
      스키마에도 반영 필요
- [ ] 제출 중 로딩 상태, 실패 시 에러 처리 추가

## 6. 계좌번호 — UI/복사 기능 완성, 실제 데이터만 남음
현재 상태: 신랑측/신부측 그룹 단위 아코디언, 그룹 안에 본인+부모님 3명씩 row로 정리됨.
복사 버튼은 `navigator.clipboard.writeText()`로 실제 동작함 (복사 시 아이콘 색상 피드백 포함).
- [x] 아코디언 열림 상태를 `useState`로 관리
- [x] 계좌 데이터를 컴포넌트 밖으로 분리 → `src/data/invitation.ts`의 `invitationData.accounts`
      (다른 커플이 재사용할 때 이 파일 하나만 바꾸면 되도록 구조화)
- [ ] 지금은 더미 계좌번호 → 실제 계좌 정보로 교체 (개발 작업 아님, 콘텐츠 수급 필요)
- [ ] **미해결**: `src/data/invitation.ts`는 git에 커밋되는 일반 소스 파일이라, 실제 계좌번호를
      넣는 순간 그대로 저장소에 커밋됨. 민감정보 분리(환경변수/비공개 저장소 등)는 아직 안 된 상태 —
      실 데이터 투입 전에 방침 결정 필요

## 7. 화환 보내기 — 기능 제거됨
~~UI 완성, 실제 연결 미정~~ → 사용자 요청으로 액션 카드/모달(`WreathModal.tsx`)을 전부 삭제,
`RsvpWreath.tsx`에는 "참석 의사 전달" 카드만 남음. 재도입 필요 시 이 섹션부터 다시 설계.

## 8. 연락하기 — UI 완성, tel/sms 연결 완료, 실제 번호만 남음
현재 상태: 모달 UI(신랑측/신부측 각 3명, 전화/문자 아이콘 버튼) 완성.
- [x] 전화 아이콘 → `tel:전화번호` 링크 연결 (`ContactEntry.phone`이 있을 때만 활성화)
- [x] 문자 아이콘 → `sms:전화번호` 링크 연결
- [x] 연락처 데이터를 컴포넌트 밖으로 분리 → `invitationData.contacts` (계좌와 동일 구조)
- [ ] 실제 연락처(전화번호) 입력 필요 — 지금은 `phone` 필드가 전부 비어 있어 버튼이 예전처럼
      비활성 상태로 보임 (개발 작업 아님, 콘텐츠 수급 필요). 계좌번호와 동일한 민감정보 분리 이슈 있음

## 9. 갤러리
- [x] 개수/이미지 URL을 `invitationData.images.gallery` 배열로 분리 (현재는 전부 빈 슬롯이라 이전과
      동일하게 placeholder만 보임 — URL을 채우면 자동으로 `<img>`로 전환됨, `PlaceholderImage` 참고)
- [ ] Firebase Storage 업로드 → 다운로드 URL을 Firestore `gallery` 컬렉션에 저장하고 그 결과로
      위 배열을 채우는 흐름은 아직 미구현 (`src/lib/firestore.ts`의 `getGalleryPhotos()`도 작성만
      되어 있고 어디서도 호출되지 않음)
- [ ] "더보기" 클릭 시 라이트박스(전체화면 뷰어) 또는 페이지 이동으로 전체 갤러리 보기
- [ ] 업로드 시 클라이언트단 이미지 리사이즈/압축 (서버 없으므로 Lambda 대신 브라우저에서 처리 — `canvas` 또는 `browser-image-compression` 라이브러리 고려)

## 10. Guest Album (하객이 올리는 사진) — 예식 당일용
- [ ] 목업에 자리는 잡혀있으나 미구현 상태
- [ ] "사진 업로드" 버튼 — 예식 당일 이후에만 활성화되는 조건 로직 (날짜 비교)
- [ ] 업로드된 사진은 별도 Storage 경로(`guest-uploads/`)에 저장, 승인 없이 바로 노출할지 여부 결정 필요

## 11. 지도
- [x] 장소명/주소/교통 안내/지도 앱 링크를 `invitationData.venue`로 분리
- [ ] 현재 `.map-placeholder` → 네이버맵 JS API(또는 정적 지도 이미지)로 교체 (좌표 필드가 아직
      데이터에 없음 — 이 작업 착수 시 `venue`에 `coords: { lat, lng }` 추가 필요)
- [ ] "네이버지도/티맵/카카오맵" 버튼 3개에 실제 딥링크 연결 (`venue.mapLinks`가 전부 `href: '#'`)

## 12. 카카오 공유
- [x] `shareKakao()` 함수는 이미 작성되어 있음 (JS 키 반영 완료)
- [x] 공유 제목/설명 문구를 `invitationData`(이름/날짜/장소)로부터 동적 생성하도록 변경 —
      더 이상 이름·날짜가 코드에 하드코딩되지 않음
- [ ] `NEXT_PUBLIC_SITE_URL`, 업로드된 OG 이미지 URL로 하드코딩된 `example.com` 값 교체 (배포 도메인 확정 후)
- [ ] `layout.tsx`는 정적 `metadata` export로 유지 중 (컴포넌트 이전 시 `generateMetadata`로 바꿀 필요는
      없음 — 데이터가 빌드타임에 이미 정적이라 굳이 동적 함수로 만들 이유가 없다고 판단, 원래 문서의
      전제가 더 이상 유효하지 않음)
- [ ] 실제 대표 사진을 Firebase Storage에 올리고 그 공개 URL을 `invitationData.images.og`에 반영

## 13. 반응형/접근성 마무리
- [ ] 480px 고정 폭 유지 여부 재확인 (데스크탑에서도 모바일처럼 보이게 의도된 디자인)
- [ ] 키보드 포커스 스타일 점검 (버튼, 아코디언, 모달 내부 폼 요소, 모달 간 포커스 트랩)
- [ ] 모달 열렸을 때 `Esc` 키로 닫히는 기능 추가 (현재는 오버레이 클릭 또는 X 버튼만 가능)
- [ ] 이미지 `alt` 텍스트 전체 점검

## 완료된 항목 (참고용 — 추가 작업 불필요)
- Timeline, Interview 섹션 제거 완료
- Tailwind v4 실제 연결 + `@theme` 디자인 토큰 추출 완료
- 전 섹션 Tailwind 전환 + `src/design-system/` 공통 프리미티브(Divider/SectionHeading/
  PlaceholderImage/OutlineButton/Modal/AccordionItem) 분리 완료
- 스크롤 리빌 + 페이지 진입 애니메이션 완료
- 연락하기/RSVP 모달 UI 및 열기·닫기 로직 완료 (화환 모달은 제거됨)
- 계좌번호 그룹 아코디언 + 클립보드 복사 완료
- 캘린더/카운트다운을 `weddingDate` 하나로부터 자동 계산하도록 개선 완료
- Ending 섹션 물결 애니메이션(무한 루프, reduced-motion 대응) 완료
- 카카오 공유 SDK 초기화 및 JS 키 반영 완료
- **청첩장 데이터 분리 완료** — 이름/생년월일/부모님/예식 일시/장소/교통/계좌/연락처/이미지 슬롯을
  `src/data/invitation.ts` 단일 config로 통합. 다른 커플이 재사용하려면 이 파일만 교체하면 됨
- **이미지 슬롯 프리사인 URL 대응 완료** — `PlaceholderImage`에 `src` prop 추가, URL이 채워지면
  자동으로 `<img>`로 렌더링 (히어로/신랑신부 프로필/갤러리/엔딩/OG 이미지 전부 대응)

## 채워야 할 콘텐츠 (개발과 별개, 결정 필요)
- 신랑/신부 프로필 사진, 대표 사진(히어로/엔딩), 갤러리 사진 → `invitationData.images`에 URL만 넣으면 됨
- 실제 계좌번호 (본인 + 양가 부모님, 총 6개) → `invitationData.accounts`
- 실제 연락처 (본인 + 양가 부모님, 총 6개) → `invitationData.contacts`
- 신랑/신부 MBTI, 관심사 해시태그 (현재 placeholder) → `invitationData.groom/bride`의 `mbti`/`interests`
- 안내사항(Information) 섹션 텍스트 — 목업엔 자리만 있고 내용 없음
- 지도 좌표(`venue.coords`), 지도 앱 딥링크(`venue.mapLinks`) 실제 값

## 남은 결정 사항
- 화환 보내기 기능을 다시 넣을지 여부 (7번 항목 참고, 현재는 완전히 제거된 상태)
- `src/data/invitation.ts`에 실제 계좌번호·전화번호를 채우게 되면 이 파일이 그대로 git에 커밋되는
  구조인데, 그래도 괜찮을지 아니면 민감 필드만 환경변수/비공개 저장소로 분리할지
