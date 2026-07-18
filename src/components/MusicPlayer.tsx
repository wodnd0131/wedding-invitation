'use client';

import { useEffect, useRef, useState } from 'react';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.3;
  }, []);

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
      <audio ref={audioRef} src="/music.mp3" loop preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? '배경음악 정지' : '배경음악 재생'}
        className="fixed bottom-[11px] right-[calc(max(1rem,calc((100vw-480px)/2+1rem))-10px)] z-[90] flex h-10 w-10 cursor-pointer items-center justify-center text-wine"
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <rect x="5" y="1" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3 7a4 4 0 0 0 8 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="7" y1="11" x2="7" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="4.5" y1="13" x2="9.5" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <rect x="5" y="1" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3 7a4 4 0 0 0 8 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="7" y1="11" x2="7" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="4.5" y1="13" x2="9.5" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="1.5" y1="1.5" x2="12.5" y2="12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  );
}
