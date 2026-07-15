'use client';

import { useState } from 'react';
import { Modal } from '@/design-system';

interface ToggleOption {
  label: string;
  value: string;
}

function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: ToggleOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 border py-[11px] text-center font-serif-kr text-[13px] ${
            value === opt.value ? 'border-wine bg-wine text-white' : 'border-line bg-white text-ink-soft'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
  const [side, setSide] = useState('groom');
  const [attend, setAttend] = useState('yes');
  const [name, setName] = useState('');
  const [meal, setMeal] = useState('yes');
  const [agree, setAgree] = useState(false);

  const ready = name.trim().length > 0 && agree;

  const handleSubmit = () => {
    if (!ready) return;
    // TODO: Firestore 'rsvp' 컬렉션에 저장하는 로직으로 교체
    alert('참석 의사가 전달되었습니다. 감사합니다!');
    setName('');
    setAgree(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} eyebrow="Rsvp" title="참석 의사 전달">
      <div className="mb-[22px]">
        <label className="mb-2.5 block text-[13px] text-ink">
          어느 측 하객이신가요?<span className="ml-0.5 text-wine">*</span>
        </label>
        <ToggleGroup
          options={[
            { label: '신랑측', value: 'groom' },
            { label: '신부측', value: 'bride' },
          ]}
          value={side}
          onChange={setSide}
        />
      </div>

      <div className="mb-[22px]">
        <label className="mb-2.5 block text-[13px] text-ink">
          참석 하시나요?<span className="ml-0.5 text-wine">*</span>
        </label>
        <ToggleGroup
          options={[
            { label: '참석', value: 'yes' },
            { label: '불참석', value: 'no' },
          ]}
          value={attend}
          onChange={setAttend}
        />
      </div>

      <div className="mb-[22px]">
        <label htmlFor="rsvp-name" className="mb-2.5 block text-[13px] text-ink">
          성함<span className="ml-0.5 text-wine">*</span>
        </label>
        <input
          id="rsvp-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요"
          className="w-full border border-line bg-white px-[14px] py-3 font-serif-kr text-[13.5px] text-ink focus:border-wine focus:outline-none"
        />
      </div>

      <div className="mb-[22px]">
        <label className="mb-2.5 block text-[13px] text-ink">식사 하시나요?</label>
        <ToggleGroup
          options={[
            { label: 'O', value: 'yes' },
            { label: 'X', value: 'no' },
          ]}
          value={meal}
          onChange={setMeal}
        />
      </div>

      <label className="mb-[26px] flex items-center gap-2 text-[11.5px] text-ink-soft">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        개인정보 수집 및 활용 동의{' '}
        <a href="#" onClick={(e) => e.preventDefault()} className="text-wine-soft underline underline-offset-2">
          [자세히보기]
        </a>
      </label>

      <button
        onClick={handleSubmit}
        className={`w-full border-none py-[14px] text-center text-[14px] tracking-[0.06em] text-white transition-colors ${
          ready ? 'cursor-pointer bg-wine' : 'cursor-not-allowed bg-line'
        }`}
      >
        전달하기
      </button>
    </Modal>
  );
}
