'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';

export default function CareerForm() {
  console.log('✅ CareerForm 컴포넌트 렌더링됨');

  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

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
      setResult(gptResult || 'GPT 응답을 불러오지 못했습니다. 응답 구조를 확인해 주세요.');
    } catch (error) {
      console.error('❌ 에러 발생:', error);
      setResult('에러가 발생했습니다. 다시 시도해 주세요.');
    }

    setLoading(false);
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(12);
    doc.text('📌 EDU Compass GPT 진로 추천 결과', 10, 10);
    doc.text(`👤 이름: ${name}`, 10, 20);
    doc.text(`🎯 관심 분야: ${interest}`, 10, 30);

    // 줄바꿈을 고려하여 여러 줄로 처리
    const splitResult = doc.splitTextToSize(result, 180);
    doc.text(splitResult, 10, 50);

    doc.save(`${name}_진로추천결과.pdf`);
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
          <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
            <h3>✅ 추천 결과:</h3>
            <p>{result}</p>
          </div>

          {/* ✅ PDF 저장 버튼 */}
          <button
            type="button"
            onClick={handleSavePDF}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            추천 결과 PDF 저장
          </button>
        </>
      )}
    </form>
  );
}
