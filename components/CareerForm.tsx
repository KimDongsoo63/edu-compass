'use client'

import { useState } from 'react'

export default function CareerForm() {
  const [name, setName] = useState('')
  const [interest, setInterest] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setResult('')

    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, interest }),
    })

    const data = await response.json()
    console.log('GPT 응답:', data)
    const gptResult = data.choices?.[0]?.message?.content
    setResult(gptResult || 'GPT 응답을 불러오지 못했습니다.')
    setLoading(false)
  }

  const handleDownloadPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('recommend-result')
    if (element) {
      html2pdf().from(element).save('recommendation.pdf')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
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
          style={{ marginRight: '1rem' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? '추천 중...' : 'GPT로 진로 추천받기'}
        </button>
      </form>

      {result && (
        <div id="recommend-result" style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h3>✅ 추천 결과:</h3>
          <p>{result}</p>
          <button onClick={handleDownloadPDF}>📄 결과 PDF 저장</button>
        </div>
      )}
    </>
  )
}
