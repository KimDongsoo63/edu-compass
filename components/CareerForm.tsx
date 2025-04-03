'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import '@fontsource/nanum-gothic'; // 폰트 추가 (npm install @fontsource/nanum-gothic 필요)

export default function CareerForm() {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
      const gptResult = data.choices?.[0]?.message?.content;

      setResult(gptResult || 'GPT 응답을 불러오지 못했습니다.');
    } catch (error) {
      console.error('❌ 에러:', error);
      setResult('에러가 발생했습니다. 다시 시도해주세요.');
    }

    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // 📝 폰트 설정: 나눔고딕 폰트 사용
    doc.setFont('NanumGothic', 'normal'); // 폰트 이름은 시스템에 따라 다를 수 있음
    doc.setFontSize(12);
    doc.text(`${name} 학생의 EDU Compass GPT 진로 추천 결과`, 10, 20);
    doc.text(result, 10, 40);
    doc.save(`${name}_진로추천결과.pdf`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
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
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? '추천 중...' : 'GPT로 진로 추천받기'}
      </button>

      {result && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h3>✅ 추천 결과:</h3>
          <p>{result}</p>
          <button onClick={handleDownloadPDF} style={{ marginTop: '1rem' }}>
            추천 결과 PDF 저장
          </button>
        </div>
      )}
    </form>
  );
}
