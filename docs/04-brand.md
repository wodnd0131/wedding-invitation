# 브랜드 / 톤 레퍼런스

다른 AI 툴(이미지 생성, 음악 생성 등)에 이 청첩장의 분위기를 설명할 때 참고하는 문서.
아래 값들은 전부 실제 코드(`app/globals.css`, `src/design-system`, `src/components`)에서 그대로 추출한 값.

## 한 줄 컨셉
**아이보리 + 와인 + 골드**의 클래식하고 우아한 모바일 청첩장. 화려하거나 트렌디하지 않고,
정갈한 인쇄 청첩장을 웹으로 옮긴 듯한 절제된 격식의 톤. 여백이 넉넉하고, 장식은 얇은 선과
작은 원형 모티프 정도로 최소화되어 있음.

## 컬러 팔레트

| 이름 | 값 | 용도 |
|---|---|---|
| ivory | `#faf7f2` | 카드/페이지 배경 |
| panel | `#f3ece3` | 바디 배경, 섹션 교차 배경(갤러리/계좌 등) |
| wine | `#6e2e3a` | 메인 포인트 — 제목, 버튼, 캘린더 마커 |
| wine-soft | `#8c4a57` | eyebrow 라벨, 이탤릭 보조 텍스트 |
| gold | `#a8834b` | 보조 포인트 — "&" 글리프, 구분선 원 |
| gold-soft | `#c9ad82` | 카드/플레이스홀더 테두리, 구분선 |
| ink | `#2a2521` | 본문 텍스트 |
| ink-soft | `#6b6259` | 보조/흐린 텍스트 |
| line | `#dcd0be` | 헤어라인 테두리(인풋, 아코디언, 테이블) |

보조로만 쓰이는 색(브랜드 토큰은 아님): 카카오톡 공유 버튼 `#FEE500`/`#3A1D1D`(카카오 고정 브랜드 컬러),
엔딩 물결 `#B27A45` 계열(앰버 톤 — `#C9A27D` 밝은 톤 + `#B27A45` 진한 톤 레이어링).

**분위기 키워드**: ivory, wine burgundy, antique gold, warm neutral, muted amber. 채도가 낮고 톤 다운된
"빈티지 웨딩 카드" 컬러 — 비비드하거나 파스텔한 색은 전혀 없음.

## 타이포그래피

- **한글 본문**: Noto Serif KR (`font-serif-kr`) — 모든 한글 카피에 사용, 격식 있는 세리프체
- **영문/숫자 디스플레이**: Cormorant Garamond (`font-garamond`, 주로 이탤릭) — eyebrow 라벨("Invitation",
  "Location" 등), 날짜 숫자, 카운트다운 숫자, "&" 앰퍼샌드 등 장식적 영문 요소 전용
- **자간(tracking)**: 영문 라벨일수록 넓게(`0.15~0.18em`), 한글 본문일수록 좁게(`0.01~0.04em`) —
  "타이트한 한글 + 널찍한 영문 캡션"의 대비가 반복되는 패턴
- sans-serif 폰트는 전혀 쓰이지 않음 — 항상 세리프

## 레이아웃 / 무드

- 480px 고정 폭 카드 레이아웃 — 데스크탑에서도 모바일 청첩장처럼 보이도록 의도됨
- 섹션마다 넉넉한 상하 여백(`py-16`), 단일 컬럼, 중앙 정렬 텍스트 — 여백이 곧 디자인
- 섹션 구분은 얇은 골드 선 — 와인색 원 — 얇은 골드 선으로 이어지는 커스텀 SVG 디바이더(장식 모티프)
- 모든 카드/사진/입력 요소는 얇은 헤어라인 테두리, 그림자 없음, 모서리는 각지게(둥근 모서리는
  캘린더의 원형 배지 정도만 예외) — 인쇄된 카드 같은 절제된 느낌
- 사진 비율: 메인 사진 4:5 세로형, 갤러리는 정사각형 그리드, 엔딩 사진은 큰 세로형 단독 컷
- 모션은 은은한 스크롤 리빌(페이드 + 살짝 위로 슬라이드)뿐 — 화려한 트랜지션 없음

## 카피 톤

- eyebrow는 항상 영문(Invitation, Wedding Day, Location, Gallery, Guestbook, Account),
  제목은 한글 — "우아한 이중언어 카드" 느낌
- 예시 문구: *"저희 두 사람의 작은 만남이 진실한 사랑으로 꽃피어 오늘 이 자리를 빛내는 결혼식으로
  이어졌습니다."*, *"평생 서로를 귀히 여기며 처음의 설렘과 순수함을 잃지 않고..."*
- 격식 있는 합니다체/겸양체, 전통 청첩장 어투 — 캐주얼하거나 유행어적인 표현 없음

## AI 이미지 생성 프롬프트에 쓸 키워드
```
elegant classic Korean wedding invitation, ivory and burgundy wine color palette,
antique gold accents, muted warm neutral tones, delicate thin hairline borders,
generous negative space, minimal ornamentation, soft serif typography feel,
refined and understated, printed invitation card aesthetic, no bright or saturated colors,
soft natural lighting, timeless and formal mood
```

## AI 음악 생성 프롬프트에 쓸 키워드
청첩장 배경음악/인트로 음악용. 위 무드(절제된 격식, 따뜻한 앰버·와인 톤, 여백 많은 미니멀함)를
소리로 옮긴다면:
```
warm and elegant instrumental, classical wedding ceremony feel, gentle piano and strings,
soft and understated (not grand or dramatic), timeless and refined, slow-to-medium tempo,
intimate chamber music texture, subtle acoustic warmth, no electronic/synth elements,
graceful and calm, evokes ivory-and-burgundy classic wedding invitation aesthetic,
minimal and spacious arrangement (mirrors the generous whitespace in the visual design)
```
- 무드 형용사: elegant, warm, intimate, refined, timeless, gentle, understated
- 피해야 할 것: 트렌디한 신스팝, 강렬한 EDM 드롭, 과도하게 화려하거나 웅장한 오케스트라 — 이
  청첩장은 "축제"보다 "정갈한 격식"에 가까움
