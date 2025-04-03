'use client';

import { useState } from 'react';

export default function CareerForm() {
  console.log('✅ CareerForm 컴포넌트 렌더링됨');

  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ PDF 저장 함수 추가
  const handleDownloadPDF = () => {
    const element = document.getElementById('result-area');
    if (element) {
      import('html2pdf.js').then((html2pdf) => {
        html2pdf.default().from(element).save('진로_추천_결과.pdf');
      });
    }
  };

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
      console.log('🧠 GPT 응답:', data);

      const gptResult = data.choices?.[0]?.message?.content;
      setResult(gptResult || 'GPT 응답을 불러오지 못했습니다.');
    } catch (error) {
      console.error('❌ 에러 발생:', error);
      setResult('에러가 발생했습니다. 다시 시도해주세요.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
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

      {result && (
        <>
          <div
            id="result-area"
            style={{
              marginTop: '1rem',
              whiteSpace: 'pre-wrap',
              background: '#f4f4f4',
              padding: '1rem',
              borderRadius: '10px',
            }}
          >
            <h3>✅ 추천 결과:</h3>
            <p>{result}</p>
          </div>

          {/* ✅ PDF 저장 버튼 */}
          <button
            onClick={handleDownloadPDF}
            style={{
              marginTop: '1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            📄 결과 PDF로 저장
          </button>
        </>
      )}
    </form>
  );
}
