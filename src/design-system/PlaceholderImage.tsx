import { ReactNode } from 'react';

interface PlaceholderImageProps {
  label: ReactNode;
  className?: string;
  variant?: 'default' | 'compact';
  src?: string;
  alt?: string;
}

const GRADIENTS = {
  default: 'bg-[repeating-linear-gradient(135deg,#EFE6D8,#EFE6D8_10px,#E7DCC9_10px,#E7DCC9_20px)]',
  compact: 'bg-[repeating-linear-gradient(135deg,#E7DCC9,#E7DCC9_8px,#EFE6D8_8px,#EFE6D8_16px)]',
};

export function PlaceholderImage({ label, className = '', variant = 'default', src, alt = '' }: PlaceholderImageProps) {
  if (src) {
    return <img src={src} alt={alt} className={`border border-gold-soft object-cover ${className}`} />;
  }

  return (
    <div
      className={`flex items-center justify-center border border-gold-soft text-center text-ink-soft ${GRADIENTS[variant]} ${className}`}
    >
      {label}
    </div>
  );
}
