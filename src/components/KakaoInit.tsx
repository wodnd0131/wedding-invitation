'use client';

import { useEffect } from 'react';
import { initKakao } from '@/lib/kakao';

export default function KakaoInit() {
  useEffect(() => {
    initKakao();
  }, []);

  return null;
}
