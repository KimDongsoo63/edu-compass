'use client';

import { useState } from 'react';
import { generatePDF } from '@/utils/pdf'; // ✅ 경로 및 이름 정확히 확인

export default function CareerForm() {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState('');

  const handleDownload = () => {
    generatePDF(name, interest, result);
  };

  return (
    <div>
      {/* 입력 폼 */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <input type="text" value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="관심 분야" />
      <textarea value={result} onChange={(e) => setResult(e.target.value)} placeholder="추천 결과" />

      <button onClick={handleDownload}>추천 결과 PDF 저장</button>
    </div>
  );
}
