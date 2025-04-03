'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import jsPDF from 'jspdf';
import { addFont } from './NanumGothicFont'; // ⬅ 폰트 파일에서 함수 불러오기

const CareerForm = () => {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !interest) {
      alert('이름과 관심 분야를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, interest }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      setResult(content || 'GPT 응답을 불러오지 못했습니다. 응답 구조를 확인해 주세요.');
      setChecked(true);
    } catch (error) {
      console.error('❌ 오류 발생:', error);
      setResult('에러가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();

    addFont(doc); // ⬅ 한글 폰트 등록
    doc.setFont('NanumGothic');
    doc.setFontSize(12);

    doc.text(`👩‍🎓 EDU Compass GPT 진로 추천 결과`, 10, 20);
    doc.text(`이름: ${name}`, 10, 30);
    doc.text(`관심 분야: ${interest}`, 10, 40);
    doc.text('추천 결과:', 10, 50);

    const lines = doc.splitTextToSize(result, 180);
    doc.text(lines, 10, 60);

    doc.save(`${name}_진로추천결과.pdf`);
  };

  return (
    <div className="p-6 space-y-4 text-center">
      <h1 className="text-xl font-bold">🎓 EDU Compass에 오신 걸 환영합니다!</h1>
      <p>AI가 여러분의 진로를 도와드립니다!</p>

      <div className="flex justify-center gap-4">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1"
        />
        <input
          type="text"
          placeholder="관심 분야"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="border px-2 py-1"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? '처리 중...' : 'GPT로 진로 추천받기'}
        </Button>
      </div>

      {checked && (
        <div className="mt-6">
          <div className="flex items-center justify-center gap-2">
            <Checkbox checked readOnly />
            <span className="font-semibold">추천 결과:</span>
          </div>
          <p className="whitespace-pre-line mt-4">{result}</p>

          {result && (
            <Button className="mt-4" onClick={handleSavePDF}>
              추천 결과 PDF 저장
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CareerForm;
