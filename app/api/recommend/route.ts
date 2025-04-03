import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, interest } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `${name} 학생은 ${interest}에 관심이 있어요. 적합한 진로를 추천해줘.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('🔴 OpenAI API 오류 응답:', errText);
      return NextResponse.json({ error: 'OpenAI 요청 실패' }, { status: 500 });
    }

    const data = await response.json();
    console.log('🧠 OpenAI 응답 데이터:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ API 처리 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
