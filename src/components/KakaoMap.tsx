'use client';

import { useEffect, useRef, useState } from 'react';
import { buildMapLinks } from '@/lib/map';

interface KakaoMapProps {
  address: string;
  name: string;
  className?: string;
}

export function KakaoMap({ address, name, className = '' }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appkey = process.env.NEXT_PUBLIC_KAKAO_MAPS_JS_KEY || process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  const [failed, setFailed] = useState(!appkey);

  useEffect(() => {
    if (!appkey) return;

    let cancelled = false;

    const renderMap = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const kakao = (window as any).kakao;
      kakao.maps.load(() => {
        if (cancelled || !containerRef.current) return;

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result: { x: string; y: string }[], status: string) => {
          if (cancelled || !containerRef.current) return;
          if (status !== kakao.maps.services.Status.OK || result.length === 0) {
            console.log('[KakaoMap] geocode failed', { address, status });
            setFailed(true);
            return;
          }

          const coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
          const map = new kakao.maps.Map(containerRef.current, { center: coords, level: 3 });
          map.setDraggable(false);
          map.setZoomable(false);
          new kakao.maps.Marker({ map, position: coords, title: name });
        });
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).kakao?.maps) {
      renderMap();
      return () => {
        cancelled = true;
      };
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&autoload=false&libraries=services`;
    script.onload = renderMap;
    script.onerror = () => {
      console.log('[KakaoMap] sdk script load failed');
      setFailed(true);
    };
    document.head.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [address, name, appkey]);

  if (failed) {
    const kakaoMapHref = buildMapLinks(address).find((link) => link.label === '카카오맵')!.href;
    return (
      <a
        href={kakaoMapHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`block border border-gold-soft bg-cover bg-center ${className}`}
        style={{ backgroundImage: 'url(/map.png)' }}
      />
    );
  }

  return <div ref={containerRef} className={`border border-gold-soft ${className}`} />;
}
