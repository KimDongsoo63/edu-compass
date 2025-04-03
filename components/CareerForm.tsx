'use client';

import { useState, useRef, useEffect } from 'react';

export default function CareerForm() {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

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
      const gptResult = data.choices?.[0]?.message?.content || 'GPT 응답을 불러오지 못했습니다.';
      setResult(gptResult);
    } catch (error) {
      console.error('❌ 오류:', error);
      setResult('에러 발생: ' + (error as any)?.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="관심 분야"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? '추천 중...' : 'GPT로 진로 추천받기'}
        </button>
      </form>

      {/* 결과 출력 */}
      {result && (
        <div ref={resultRef} style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h3>✅ 추천 결과:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
