'use client';

import { useState, useRef, useEffect } from 'react';

export default function CareerForm() {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null); // 👈 자동 스크롤용

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, interest }),
      });

      const data = await response.json();
      const gptResult = data.choices?.[0]?.message?.content || JSON.stringify(data);
      setResult(gptResult);
    } catch (error) {
      console.error('❌ 에러 발생:', error);
      setResult('에러가 발생했습니다. 다시 시도해주세요.');
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {/* 폼 영역 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="관심 분야"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
          style={{ marginRight: '1rem' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? '추천 중...' : 'GPT로 진로 추천받기'}
        </button>
      </form>

      {/* 결과 영역 */}
      <div
        ref={resultRef}
        style={{
          marginTop: '2rem',
          padding: '1rem',
          maxWidth: '900px',
          marginInline: 'auto',
          whiteSpace: 'pre-wrap',
          textAlign: 'left',
        }}
      >
        {result && (
          <>
            <h3>✅ 추천 결과:</h3>
            <p>{result}</p>
          </>
        )}
      </div>
    </div>
  );
}
