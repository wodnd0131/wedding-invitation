'use client';

import { ReactNode, useState } from 'react';
import RsvpModal from '@/components/modals/RsvpModal';
import { OutlineButton } from '@/design-system';

interface ActionCardProps {
  title: string;
  description: ReactNode;
  buttonLabel: string;
  onAction: () => void;
}

function ActionCard({ title, description, buttonLabel, onAction }: ActionCardProps) {
  return (
    <div className="reveal-child mb-4 border border-line px-5 py-[26px] text-center last:mb-0">
      <div className="mb-2 text-[15px] font-semibold">{title}</div>
      <div className="mb-4 text-[12px] leading-[1.8] text-ink-soft">{description}</div>
      <OutlineButton onClick={onAction} className="px-[26px] py-2.5">
        {buttonLabel}
      </OutlineButton>
    </div>
  );
}

export default function RsvpWreath() {
  const [rsvpOpen, setRsvpOpen] = useState(false);

  return (
    <>
      <div className="reveal-group px-7 py-16">
        <ActionCard
          title="참석 의사 전달"
          description={
            <>
              신랑, 신부에게 참석의사를<br />미리 전달할 수 있어요.
            </>
          }
          buttonLabel="전달하기"
          onAction={() => setRsvpOpen(true)}
        />
      </div>

      <RsvpModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </>
  );
}
