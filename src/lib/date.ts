const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getPeriodAndHour(date: Date) {
  const hours = date.getHours();
  const period = hours < 12 ? '오전' : '오후';
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return { period, displayHour };
}

export function formatWeddingDateLong(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const { period, displayHour } = getPeriodAndHour(date);
  return `${y}. ${m}. ${d}. ${WEEKDAYS[date.getDay()]}요일 ${period} ${displayHour}시`;
}

export function formatWeddingDateShort(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const { period, displayHour } = getPeriodAndHour(date);
  return `${y}. ${m}. ${d}. (${WEEKDAYS[date.getDay()]}) ${period} ${displayHour}시`;
}

export function formatBirthDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}년 ${m}월 ${d}일`;
}
