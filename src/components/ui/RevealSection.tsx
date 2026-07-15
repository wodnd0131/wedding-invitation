import { ReactNode } from 'react';

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  isGroup?: boolean;
}

export const RevealSection = ({
  children,
  className = '',
  isGroup = false,
}: RevealSectionProps) => {
  const baseClass = isGroup ? 'reveal-group' : 'reveal';
  return (
    <div className={`${baseClass} ${className}`}>
      {children}
    </div>
  );
};
