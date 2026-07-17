import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// 일부 네트워크/프록시 환경에서 기본 WebChannel 스트리밍이 응답 없이 멈추는 문제가 있어
// long polling으로 자동 폴백하도록 설정 (Firebase 공식 문서에서 권장하는 대응)
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
export const storage = getStorage(app);
