// utils/pdf.ts

import jsPDF from 'jspdf';
import './NanumGothic-normal'; // ✅ 상대 경로로 변경

export const generatePDF = (name: string, interest: string, result: string) => {
  const doc = new jsPDF();

  doc.setFont('NanumGothic');
  doc.setFontSize(12);

  const content = `
  EDU Compass GPT 진로 추천 결과

  이름: ${name}
  관심 분야: ${interest}

  추천 결과:
  ${result}
  `;

  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 10, 20);

  doc.save(`${name}_진로추천결과.pdf`);
};
