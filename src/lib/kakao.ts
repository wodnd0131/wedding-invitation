declare global {
  interface Window {
    Kakao: any;
  }
}

export const initKakao = () => {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js';
  script.integrity =
    'sha384-OL+ylM/iuPLtW5U3XcvLSGhE8JzReKDank5InqlHGWPhb4140/yrBw0bg0y7+C9J';
  script.crossOrigin = 'anonymous';
  script.onload = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  };
  document.head.appendChild(script);
};

export const shareKakao = () => {
  if (typeof window === 'undefined' || !window.Kakao) {
    console.error('Kakao SDK not loaded');
    return;
  }

  if (!window.Kakao.isInitialized()) {
    console.error('Kakao not initialized');
    return;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '강동욱 ❤ 여다은 결혼합니다',
      description: '2026. 09. 06. (일) 오후 3시\n월드컵컨벤션 임페리얼볼룸',
      imageUrl: `${siteUrl}/images/og-image.jpg`,
      link: {
        mobileWebUrl: siteUrl,
        webUrl: siteUrl,
      },
    },
    buttons: [
      {
        title: '청첩장 보기',
        link: {
          mobileWebUrl: siteUrl,
          webUrl: siteUrl,
        },
      },
    ],
  });
};
