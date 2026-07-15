export default function Home() {
  return (
    <div className="flex justify-center bg-slate-100">
      <div
        className="w-full max-w-96 bg-white min-h-screen"
        style={{
          background: 'var(--bg-ivory)',
        }}
      >
        <div className="py-32 px-7 text-center">
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: 'var(--wine)' }}
          >
            환경 구성 완료 ✓
          </h1>
          <p style={{ color: 'var(--ink-soft)' }}>
            다음 단계: 섹션 컴포넌트 구현
          </p>
        </div>
      </div>
    </div>
  );
}
