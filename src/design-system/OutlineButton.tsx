import { ButtonHTMLAttributes } from 'react';

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'wine' | 'gold';
}

export function OutlineButton({ variant = 'wine', className = '', children, ...props }: OutlineButtonProps) {
  const colorClass = variant === 'gold' ? 'border-gold text-gold' : 'border-wine text-wine';

  return (
    <button
      className={`cursor-pointer border bg-transparent text-center font-serif-kr text-[13.5px] tracking-[0.06em] ${colorClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
