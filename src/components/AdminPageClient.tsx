'use client';

import { useCallback, useEffect, useState } from 'react';
import { deleteGuestbookEntryAdmin, getGuestbookEntries, getRsvpResponses } from '@/lib/firestore';
import { GuestbookEntry, RsvpResponse } from '@/types/invitation';

function formatDateTime(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${hh}:${mm}`;
}

export default function AdminPageClient() {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [rsvp, setRsvp] = useState<RsvpResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  const fetchAll = useCallback(async () => {
    try {
      const [gb, rv] = await Promise.all([getGuestbookEntries(200), getRsvpResponses()]);
      setGuestbook(gb);
      setRsvp(rv);
      setLoadError('');
    } catch {
      setLoadError('데이터를 불러오지 못했습니다. Firestore rsvp 컬렉션의 read 권한을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (unlocked) fetchAll();
  }, [unlocked, fetchAll]);

  const handleUnlock = () => {
    const code = process.env.NEXT_PUBLIC_ADMIN_PASSCODE;
    if (code && passcode === code) {
      setLoading(true);
      setUnlocked(true);
      setAuthError('');
    } else {
      setAuthError('접근 코드가 올바르지 않습니다.');
    }
  };

  const handleDeleteGuestbook = async (id: string) => {
    if (!window.confirm('이 방명록을 삭제할까요?')) return;
    await deleteGuestbookEntryAdmin(id);
    fetchAll();
  };

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-panel px-5">
        <div className="w-full max-w-[320px] border border-gold-soft bg-ivory p-7 text-center">
          <div className="mb-5 text-[15px] font-semibold text-ink">관리자 페이지</div>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            placeholder="접근 코드"
            className="mb-3 w-full border border-line bg-white px-[14px] py-3 font-serif-kr text-[13.5px] text-ink focus:border-wine focus:outline-none"
          />
          {authError && <div className="mb-3 text-[12px] text-wine">{authError}</div>}
          <button
            onClick={handleUnlock}
            className="w-full cursor-pointer border-none bg-wine py-3 text-[13.5px] text-white"
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  const attending = rsvp.filter((r) => r.attending);
  const notAttending = rsvp.filter((r) => !r.attending);
  const mealCount = attending.filter((r) => r.meal).length;
  const groomAttending = attending.filter((r) => r.side === 'groom');
  const brideAttending = attending.filter((r) => r.side === 'bride');

  return (
    <div className="min-h-screen bg-panel px-5 py-10">
      <div className="mx-auto max-w-[800px]">
        <h1 className="mb-8 text-[20px] font-semibold text-ink">관리자 페이지</h1>

        {loadError && <div className="mb-6 border border-wine bg-white p-4 text-[12.5px] text-wine">{loadError}</div>}

        <section className="mb-12">
          <h2 className="mb-4 text-[16px] font-semibold text-ink">참석 의사 (RSVP)</h2>

          <div className="mb-3 grid grid-cols-4 gap-2.5">
            <div className="border border-line bg-white p-4 text-center">
              <div className="text-[11px] text-ink-soft">전체 응답</div>
              <div className="mt-1 text-[22px] font-semibold text-wine">{rsvp.length}</div>
            </div>
            <div className="border border-line bg-white p-4 text-center">
              <div className="text-[11px] text-ink-soft">참석</div>
              <div className="mt-1 text-[22px] font-semibold text-wine">{attending.length}</div>
            </div>
            <div className="border border-line bg-white p-4 text-center">
              <div className="text-[11px] text-ink-soft">불참</div>
              <div className="mt-1 text-[22px] font-semibold text-wine">{notAttending.length}</div>
            </div>
            <div className="border border-line bg-white p-4 text-center">
              <div className="text-[11px] text-ink-soft">식사 인원</div>
              <div className="mt-1 text-[22px] font-semibold text-wine">{mealCount}</div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-2.5">
            <div className="border border-line bg-white p-4 text-center">
              <div className="text-[11px] text-ink-soft">신랑측 참석 / 식사</div>
              <div className="mt-1 text-[16px] font-semibold text-ink">
                {groomAttending.length} / {groomAttending.filter((r) => r.meal).length}
              </div>
            </div>
            <div className="border border-line bg-white p-4 text-center">
              <div className="text-[11px] text-ink-soft">신부측 참석 / 식사</div>
              <div className="mt-1 text-[16px] font-semibold text-ink">
                {brideAttending.length} / {brideAttending.filter((r) => r.meal).length}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border border-line bg-white">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="border-b border-line bg-panel">
                  <th className="px-3 py-2">이름</th>
                  <th className="px-3 py-2">측</th>
                  <th className="px-3 py-2">참석</th>
                  <th className="px-3 py-2">식사</th>
                  <th className="px-3 py-2">제출 시각</th>
                </tr>
              </thead>
              <tbody>
                {rsvp.map((r) => (
                  <tr key={r.id} className="border-b border-line last:border-b-0">
                    <td className="px-3 py-2">{r.name}</td>
                    <td className="px-3 py-2">{r.side === 'groom' ? '신랑측' : '신부측'}</td>
                    <td className="px-3 py-2">{r.attending ? 'O' : 'X'}</td>
                    <td className="px-3 py-2">{r.meal ? 'O' : 'X'}</td>
                    <td className="px-3 py-2 text-ink-soft">{formatDateTime(r.createdAt)}</td>
                  </tr>
                ))}
                {rsvp.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-ink-soft">
                      아직 응답이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
              {rsvp.length > 0 && (
                <tfoot>
                  <tr className="border-t border-line bg-panel font-semibold">
                    <td className="px-3 py-2" colSpan={2}>
                      합계
                    </td>
                    <td className="px-3 py-2">{attending.length}</td>
                    <td className="px-3 py-2">{mealCount}</td>
                    <td className="px-3 py-2" />
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-[16px] font-semibold text-ink">방명록 관리</h2>
          <div className="border border-line bg-white">
            {guestbook.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0"
              >
                <div>
                  <div className="text-[13px] font-semibold text-ink">{entry.name}</div>
                  <div className="mt-1 text-[12.5px] text-ink-soft">{entry.message}</div>
                  <div className="mt-1 text-[11px] text-[#B8AF9F]">{formatDateTime(entry.createdAt)}</div>
                </div>
                <button
                  onClick={() => handleDeleteGuestbook(entry.id)}
                  className="shrink-0 cursor-pointer border border-line bg-transparent px-3 py-1.5 text-[11px] text-ink-soft hover:border-wine hover:text-wine"
                >
                  삭제
                </button>
              </div>
            ))}
            {guestbook.length === 0 && (
              <div className="px-4 py-6 text-center text-[12.5px] text-ink-soft">작성된 방명록이 없습니다.</div>
            )}
          </div>
        </section>

        {loading && <div className="mt-6 text-center text-[12px] text-ink-soft">불러오는 중...</div>}
      </div>
    </div>
  );
}
