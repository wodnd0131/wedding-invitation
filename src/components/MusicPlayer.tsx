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
      <audio ref={audioRef} src="/Sunlight_on_Ivory.mp3" loop preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? '배경음악 정지' : '배경음악 재생'}
        className="fixed bottom-4 right-[max(1rem,calc((100vw-480px)/2+1rem))] z-[90] flex h-10 w-10 cursor-pointer items-center justify-center text-wine"
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
            <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 1.5 L12 7 L2.5 12.5 Z" fill="currentColor" />
          </svg>
        )}
      </button>
    </>
  );
}
