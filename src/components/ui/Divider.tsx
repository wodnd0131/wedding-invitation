export const Divider = () => {
  return (
    <div className="flex justify-center my-10">
      <svg
        className="w-32 h-5"
        viewBox="0 0 120 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="10"
          x2="45"
          y2="10"
          stroke="var(--gold-soft)"
          strokeWidth="1"
        />
        <circle
          cx="60"
          cy="10"
          r="3"
          stroke="var(--wine)"
          strokeWidth="1"
          fill="none"
        />
        <line
          x1="75"
          y1="10"
          x2="120"
          y2="10"
          stroke="var(--gold-soft)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};
