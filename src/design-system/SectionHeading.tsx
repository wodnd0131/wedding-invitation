interface SectionHeadingProps {
  eyebrow: string;
  title?: string;
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <>
      <div className="mb-1.5 text-center font-garamond text-[15px] italic tracking-[0.18em] text-wine-soft">
        {eyebrow}
      </div>
      {title && (
        <div className="mb-9 text-center text-[21px] font-semibold tracking-[0.02em] text-ink">
          {title}
        </div>
      )}
    </>
  );
}
