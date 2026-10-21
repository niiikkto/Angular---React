import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const active = total - done;

  return (
    <section>
      <h1>Менеджер задач</h1>
      <p>Ваши задачи:</p>
      <ul className="stats">
        <li>Всего задач: <b>{total}</b></li>
        <li>Выполнено: <b>{done}</b></li>
        <li>Активно: <b>{active}</b></li>
      </ul>
      <button onClick={() => navigate('/tasks')}>Перейти к задачам</button>
    </section>
  );
}
