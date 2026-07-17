// 실제 청첩장 데이터 템플릿.
// 사용법: 이 파일을 invitation.data.ts로 복사한 뒤 실제 값으로 채우세요.
// invitation.data.ts는 개인정보를 담고 있어 .gitignore 처리되어 있고, git에 커밋되지 않습니다.
import { CoreInvitationData } from './invitation.types';

export const invitationData: CoreInvitationData = {
  groom: {
    name: '홍길동',
    birthDate: '1996-01-01',
    father: '홍판서',
    mother: '춘섬',
  },
  bride: {
    name: '김영희',
    birthDate: '1997-01-01',
    father: '김철수',
    mother: '이순자',
  },
  weddingDate: new Date('2026-12-31T13:00:00'),
  venue: {
    name: '샘플웨딩홀 3F, 그랜드볼룸',
    address: '서울 강남구 테헤란로 1',
    transit: [
      {
        label: '주차',
        lines: ['건물 지하 주차장 이용', '(2시간 무료, 이후 30분당 1,000원)'],
      },
      {
        label: '지하철',
        lines: ['2호선 강남역 3번 출구 → 도보 5분'],
      },
    ],
  },
  accounts: {
    groom: [
      { name: '홍길동', bankName: '국민은행', accountNumber: '000-000000-00-000' },
      { name: '홍판서', bankName: '국민은행', accountNumber: '000-000000-00-000' },
      { name: '춘섬', bankName: '국민은행', accountNumber: '000-000000-00-000' },
    ],
    bride: [
      { name: '김영희', bankName: '신한은행', accountNumber: '000-000-000000' },
      { name: '김철수', bankName: '신한은행', accountNumber: '000-000-000000' },
      { name: '이순자', bankName: '신한은행', accountNumber: '000-000-000000' },
    ],
  },
  contacts: {
    groom: [
      { role: '신랑', name: '홍길동' },
      { role: '신랑 아버님', name: '홍판서' },
      { role: '신랑 어머님', name: '춘섬' },
    ],
    bride: [
      { role: '신부', name: '김영희' },
      { role: '신부 아버님', name: '김철수' },
      { role: '신부 어머님', name: '이순자' },
    ],
  },
};
