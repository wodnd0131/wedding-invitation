import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase';
import { GuestbookEntry, RsvpResponse } from '@/types/invitation';

// ========== Guestbook ==========
export const addGuestbookEntry = async (
  name: string,
  message: string,
  passwordHash: string
): Promise<string> => {
  const docRef = await addDoc(collection(db, 'guestbook'), {
    name,
    message,
    passwordHash,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const getGuestbookEntries = async (pageSize: number = 20) => {
  const q = query(
    collection(db, 'guestbook'),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name,
      message: data.message,
      passwordHash: data.passwordHash,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
    } as GuestbookEntry;
  });
};

export const deleteGuestbookEntry = async (entryId: string, passwordHash: string) => {
  const ref = doc(db, 'guestbook', entryId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists() || snapshot.data().passwordHash !== passwordHash) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }
  await deleteDoc(ref);
};

// 관리자 페이지 전용 — 비밀번호 대조 없이 바로 삭제
export const deleteGuestbookEntryAdmin = async (entryId: string) => {
  await deleteDoc(doc(db, 'guestbook', entryId));
};

// ========== RSVP ==========
export const addRsvpResponse = async (
  name: string,
  side: 'groom' | 'bride',
  attending: boolean,
  meal: boolean
): Promise<string> => {
  const docRef = await addDoc(collection(db, 'rsvp'), {
    name,
    side,
    attending,
    meal,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const getRsvpResponses = async () => {
  const q = query(collection(db, 'rsvp'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name,
      side: data.side,
      attending: data.attending,
      meal: data.meal,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
    } as RsvpResponse;
  });
};
