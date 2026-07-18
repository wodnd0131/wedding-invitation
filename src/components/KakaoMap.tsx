'use client';

import { useEffect, useRef, useState } from 'react';

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
    script.onerror = () => setFailed(true);
    document.head.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [address, name, appkey]);

  if (failed) {
    return (
      <div
        className={`flex items-end justify-center border border-gold-soft bg-cover bg-center text-center ${className}`}
        style={{ backgroundImage: 'url(/map.png)' }}
      >
        <span className="mb-2 bg-white/80 px-2 py-0.5 text-[11px] text-ink-soft">지도를 불러오지 못했습니다</span>
      </div>
    );
  }

  return <div ref={containerRef} className={`border border-gold-soft ${className}`} />;
}
