export interface CalendarCell {
  day: number;
  muted: boolean;
  marked: boolean;
}

export function buildCalendarWeeks(targetDate: Date): CalendarCell[][] {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);
  const totalCells = firstOfMonth.getDay() + lastOfMonth.getDate();
  const weekCount = Math.ceil(totalCells / 7);

  const cursor = new Date(year, month, 1 - firstOfMonth.getDay());
  const weeks: CalendarCell[][] = [];

  for (let w = 0; w < weekCount; w++) {
    const week: CalendarCell[] = [];
    for (let d = 0; d < 7; d++) {
      week.push({
        day: cursor.getDate(),
        muted: cursor.getMonth() !== month,
        marked:
          cursor.getFullYear() === year &&
          cursor.getMonth() === month &&
          cursor.getDate() === targetDate.getDate(),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}
