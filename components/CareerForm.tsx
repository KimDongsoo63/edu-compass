import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

export default function CareerForm() {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      const fontUrl = '/fonts/NanumGothic.ttf';
      const response = await fetch(fontUrl);
      const fontData = await response.arrayBuffer();
      const fontString = btoa(
        new Uint8Array(fontData).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      const doc = new jsPDF();
      doc.addFileToVFS('NanumGothic.ttf', fontString);
      doc.addFont('NanumGothic.ttf', 'NanumGothic', 'normal');
    };
    loadFont();
  }, []);

  const handleSubmit = async () => {
    if (!name || !interest) return;

    setLoading(true);
    setError(false);
    setRecommendation('');

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, interest }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      console.log('💬 GPT 응답:', content);

      if (content) {
        setRecommendation(content);
      } else {
        setRecommendation('GPT 응답을 불러오지 못했습니다. 응답 구조를 확인해 주세요.');
      }
    } catch (err) {
      console.error('❌ 오류:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePdf = () => {
    const doc = new jsPDF();
    doc.setFont('NanumGothic');
    doc.setFontSize(12);

    doc.text(`👩‍🎓 EDU Compass GPT 진로 추천 결과`, 10, 20);
    doc.text(`이름: ${name}`, 10, 30);
    doc.text(`관심 분야: ${interest}`, 10, 40);

    const lines = doc.splitTextToSize(`추천 결과: ${recommendation}`, 180);
    doc.text(lines, 10, 50);

    doc.save(`${name}_진로추천결과.pdf`);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-xl font-bold mb-2">🎓 EDU Compass에 오신 걸 환영합니다!</h1>
      <p className="mb-4">AI가 여러분의 진로를 도와드립니다!</p>

      <div className="space-x-4 mb-4">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          placeholder="관심 분야"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          GPT로 진로 추천받기
        </button>
      </div>

      {loading && <p>로딩 중...</p>}
      {error && <p className="text-red-500">에러가 발생했습니다. 다시 시도해 주세요.</p>}

      {recommendation && (
        <div className="mt-4 max-w-3xl mx-auto text-left">
          <p className="mb-2">
            <span className="inline-block align-middle text-green-600 text-xl mr-2">✅</span>
            <strong>추천 결과:</strong>
          </p>
          <p className="whitespace-pre-wrap leading-relaxed">{recommendation}</p>

          <div className="mt-4 text-center">
            <button
              onClick={handleSavePdf}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              추천 결과 PDF 저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
