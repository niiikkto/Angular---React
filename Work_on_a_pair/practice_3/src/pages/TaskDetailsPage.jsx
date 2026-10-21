import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, toggleTask, removeTask } = useTasks();

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <section>
        <h1>Задача не найдена</h1>
        <Link to="/tasks">← К списку задач</Link>
      </section>
    );
  }

  const handleDelete = () => {
    if (!window.confirm(`Удалить задачу «${task.title}»?`)) return;
    removeTask(task.id);
    navigate('/tasks');
  };

  return (
    <section>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <h1>{task.title}</h1>
      <p>{task.description || <i>Без описания</i>}</p>
      <p>Создана: {new Date(task.createdAt).toLocaleString('ru-RU')}</p>
      <p>Статус: {task.done ? 'Выполнена ✅' : 'В работе ⏳'}</p>
      <div className="actions">
        <button onClick={() => toggleTask(task.id)}>
          {task.done ? 'Вернуть в работу' : 'Отметить выполненной'}
        </button>
        <button onClick={handleDelete}>Удалить</button>
      </div>
    </section>
  );
}
