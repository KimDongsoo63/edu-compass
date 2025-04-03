'use client';

import { useState } from 'react';
import { generatePDF } from '@/utils/pdf';

export default function CareerForm() {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = () => {
    // GPT 결과 예시. 실제로는 API 호출 결과일 수 있음
    const mockResult =
      `${name} 학생이 ${interest} 분야에 관심이 있다면 관련 분야의 진로를 탐색해보는 것이 좋습니다.`;

    setResult(mockResult);
  };

  const handleDownload = () => {
    if (!name || !interest || !result) {
      alert('이름과 관심분야를 입력하고 결과를 생성하세요.');
      return;
    }

    generatePDF(name, interest, result);
  };

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">EDU Compass에 오신 걸 환영합니다!</h1>

      <input
        type="text"
        placeholder="이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-3 py-2 w-full rounded"
      />

      <input
        type="text"
        placeholder="관심 분야 입력 (예: 환경, 경제)"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        className="border px-3 py-2 w-full rounded"
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        GPT로 진로 추천받기
      </button>

      {result && (
        <>
          <div className="border p-4 rounded bg-gray-100 whitespace-pre-wrap">
            <p><strong>추천 결과:</strong></p>
            <p>{result}</p>
          </div>

          <button
            onClick={handleDownload}
            className="mt-4 bg-black text-white px-4 py-2 rounded"
          >
            추천 결과 PDF 저장
          </button>
        </>
      )}
    </div>
  );
}
