'use client';

import { useEffect, useRef, useState } from 'react';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying((prev) => !prev);
  };

  return (
    <>
      <audio ref={audioRef} src="/Sunlight_on_Ivory.mp3" loop preload="none" />
      <div className="group fixed bottom-4 right-[max(1rem,calc((100vw-480px)/2+1rem))] z-[90]">
        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 flex h-28 w-9 -translate-x-1/2 items-center justify-center border border-gold-soft bg-ivory opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="음량 조절"
            style={{ accentColor: 'var(--color-wine)' }}
            className="h-1 w-20 -rotate-90"
          />
        </div>

        <button
          onClick={toggle}
          aria-label={playing ? '배경음악 정지' : '배경음악 재생'}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gold-soft bg-ivory text-wine"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
              <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 1.5 L12 7 L2.5 12.5 Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
