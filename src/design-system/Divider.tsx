export function Divider() {
  return (
    <div className="my-[27px] flex justify-center">
      <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-[120px]">
        <line x1="0" y1="10" x2="45" y2="10" stroke="var(--color-gold-soft)" strokeWidth="1" />
        <circle cx="60" cy="10" r="3" stroke="var(--color-wine)" strokeWidth="1" fill="none" />
        <line x1="75" y1="10" x2="120" y2="10" stroke="var(--color-gold-soft)" strokeWidth="1" />
      </svg>
    </div>
  );
}
