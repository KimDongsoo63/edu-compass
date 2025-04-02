import CareerForm from './components/CareerForm'; // ✅ 1. 정확한 import

export default function Home() {
  return (
    <main>
      <h1>EDU Compass에 오신 걸 환영합니다!</h1>
      <CareerForm />  {/* ✅ 2. return 안에서 렌더링 */}
    </main>
  );
}
