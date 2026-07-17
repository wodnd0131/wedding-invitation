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
