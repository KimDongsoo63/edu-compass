import CareerForm from '../components/CareerForm';

export default function Home() {
  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🎓 EDU Compass에 오신 걸 환영합니다!</h1>
      <p>AI가 여러분의 진로를 도와드립니다!</p>
      <br />
      <CareerForm />
    </main>
  );
}
