import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';

const FILTERS = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'done', label: 'Выполненные' },
];

export default function TasksPage() {
  const { tasks, addTask, toggleTask, removeTask } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const rawFilter = searchParams.get('filter');
  const filter = FILTERS.some((f) => f.value === rawFilter) ? rawFilter : 'all';

  const visible = tasks.filter((t) =>
    filter === 'active' ? !t.done : filter === 'done' ? t.done : true
  );

  const changeFilter = (value) => {
    // "all" — чистый URL без параметра
    setSearchParams(value === 'all' ? {} : { filter: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTask(trimmed, description.trim());
    setTitle('');
    setDescription('');
  };

  const handleDelete = (task) => {
    if (window.confirm(`Удалить задачу «${task.title}»?`)) removeTask(task.id);
  };

  return (
    <section>
      <h1>Задачи</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название (обязательно)"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание (необязательно)"
          rows={2}
        />
        <button type="submit" disabled={!title.trim()}>
          Добавить
        </button>
      </form>

      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => changeFilter(f.value)}
            className={filter === f.value ? 'active' : ''}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p>Пусто</p>
      ) : (
        <ul className="list">
          {visible.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                aria-label={`Выполнено: ${task.title}`}
              />
              <Link to={`/tasks/${task.id}`} className={task.done ? 'done' : ''}>
                {task.title}
              </Link>
              <button onClick={() => handleDelete(task)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
