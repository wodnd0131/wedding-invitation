const TIME_ZONE = 'Asia/Seoul';

function getPeriodAndHour(hour: number) {
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return { period, displayHour };
}

// weddingDate는 항상 한국 시간(KST) 기준이므로, 실행 환경의 로컬 시간대(예: Vercel 서버의 UTC)와
// 무관하게 항상 Asia/Seoul 기준으로 날짜/시간을 뽑아낸다.
function getSeoulParts(date: Date) {
  const [year, month, day] = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .split('-');

  let hour = Number(
    new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, hour: 'numeric', hour12: false }).format(date)
  );
  if (hour === 24) hour = 0;

  const weekday = new Intl.DateTimeFormat('ko-KR', { timeZone: TIME_ZONE, weekday: 'short' }).format(date).charAt(0);

  return { year, month, day, hour, weekday };
}

export function formatWeddingDateLong(date: Date): string {
  const { year, month, day, hour, weekday } = getSeoulParts(date);
  const { period, displayHour } = getPeriodAndHour(hour);
  return `${year}. ${month}. ${day}. ${weekday}요일 ${period} ${displayHour}시`;
}

export function formatWeddingDateShort(date: Date): string {
  const { year, month, day, hour, weekday } = getSeoulParts(date);
  const { period, displayHour } = getPeriodAndHour(hour);
  return `${year}. ${month}. ${day}. (${weekday}) ${period} ${displayHour}시`;
}

export function formatBirthDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}년 ${m}월 ${d}일`;
}
