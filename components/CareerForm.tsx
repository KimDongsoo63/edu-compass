'use client'; // ✅ 꼭 필요!

import { useState } from 'react';

export default function CareerForm() {
  console.log('✅ CareerForm 컴포넌트 렌더링됨'); // 👈 확인 로그!

  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, interest }),
    });

    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">GPT로 진로 추천받기</button>
      {loading && <p>추천 중입니다...</p>}
      {result && <p>{result}</p>}
    </form>
  );
}
