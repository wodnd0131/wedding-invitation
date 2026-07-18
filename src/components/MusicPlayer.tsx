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
            <polygon points="6 3 3.5 5 1.5 5 1.5 9 3.5 9 6 11" fill="currentColor" />
            <path d="M8 5.3c1 .8 1 2.6 0 3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M9.8 3.8c2 1.5 2 4.9 0 6.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <polygon points="6 3 3.5 5 1.5 5 1.5 9 3.5 9 6 11" fill="currentColor" />
            <line x1="8.5" y1="4.5" x2="13" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="13" y1="4.5" x2="8.5" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  );
}
