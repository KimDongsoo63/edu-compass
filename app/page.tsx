'use client'
import { useState } from "react"

export default function Home() {
  const [name, setName] = useState("")
  const [grade, setGrade] = useState("")
  const [interest, setInterest] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    setResult("")

    const mock = `
    1. 환경과학자 - 환경 보호에 관심이 많고 분석적 사고에 적합함
    2. 동물보호 활동가 - 생명 존중과 사회적 가치 실현에 관심
    3. 생물학 연구원 - 자연과 생명에 대한 깊은 호기심이 강함
    `

    setTimeout(() => {
      setResult(mock)
      setLoading(false)
    }, 1500)
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">🎓 EDU나침반</h1>
      <p className="text-center mb-6">AI가 분석한 나만의 진로 추천</p>

      <input className="w-full p-2 border mb-3 rounded" placeholder="이름" value={name} onChange={e => setName(e.target.value)} />
      <input className="w-full p-2 border mb-3 rounded" placeholder="학년 (예: 중3, 고1)" value={grade} onChange={e => setGrade(e.target.value)} />
      <textarea className="w-full p-2 border mb-3 rounded" placeholder="관심사나 좋아하는 활동을 자유롭게 입력해보세요" value={interest} onChange={e => setInterest(e.target.value)} />

      <button onClick={handleAnalyze} disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {loading ? "분석 중..." : "GPT로 진로 추천 받기"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap">{result}</div>
      )}
    </main>
  )
}
