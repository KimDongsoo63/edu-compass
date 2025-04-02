import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, interest } = await req.json();

  // ✅ 환경변수 확인 로그
  console.log('🌐 OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

  // ✅ OpenAI 호출
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

  const data = await response.json();

  console.log('🔍 OpenAI 응답:', JSON.stringify(data, null, 2));

  return NextResponse.json(data);
}
