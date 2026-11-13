import Header from './components/Header';
import StatCard from './components/StatCard';
import StudentList from './components/StudentList';
import Footer from './components/Footer';
import { students } from './data/students';

function App() {
  const totalStudents = students.length;
  const avgGpa =
    students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;
  const youngestAge = Math.min(...students.map((s) => s.age));
  const uniqueCities = new Set(students.map((s) => s.city)).size;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <Header />

      {/* Задание 4: передаём пропс icon в каждый StatCard */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <StatCard
          icon="👥"
          label="Всего студентов"
          value={totalStudents}
          color="#e0f2fe"
        />
        <StatCard
          icon="📊"
          label="Средний балл"
          value={avgGpa.toFixed(2)}
          color="#dcfce7"
        />
        <StatCard
          icon="🎂"
          label="Младший возраст"
          value={`${youngestAge} лет`}
          color="#fef3c7"
        />
        <StatCard
          icon="🏙️"
          label="Городов"
          value={uniqueCities}
          color="#fce7f3"
        />
      </div>

      <h2 style={{ marginBottom: 16 }}>Список студентов</h2>

      <StudentList students={students} />

      {/* Задание 1: футер с копирайтом */}
      <Footer />
    </div>
  );
}

export default App;