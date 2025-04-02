import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, interest } = await req.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
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
  const result = data.choices?.[0]?.message?.content;

  return NextResponse.json({ result });
}
