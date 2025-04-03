import jsPDF from 'jspdf';
import fontData from './fonts/NanumGothic-Regular.ttf?url';

export const addFont = (doc: jsPDF) => {
  doc.addFileToVFS('NanumGothic.ttf', fontData);
  doc.addFont('NanumGothic.ttf', 'NanumGothic', 'normal');
};
