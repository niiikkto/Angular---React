import { useState } from 'react';
import TodoForm from './components/TodoForm';
import Filters from './components/Filters';
import TodoList from './components/TodoList';

function App() {
  // ---- Состояние ----
  // Задаем начальные id на основе текущего времени минус несколько минут,
  // чтобы у дефолтных задач сразу красиво отображались дата и время
  const [todos, setTodos] = useState([
    { id: Date.now() - 60000 * 30, text: 'Изучить useState', done: true, priority: 'high' }, // 30 минут назад
    { id: Date.now() - 60000 * 10, text: 'Разобраться со списками', done: false, priority: 'medium' }, // 10 минут назад
    { id: Date.now(), text: 'Сделать todo', done: false, priority: 'low' }, // Только что
  ]);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'

  // ---- Колбэки для детей ----

  function addTodo({ text, priority }) {
    const newTodo = {
      id: Date.now(), // Используется как уникальный ключ и как метка времени создания
      text,
      priority,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, newText) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  // ---- Вычисляемые данные ----

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
  };

  const visibleTodos = todos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true; // 'all'
  });

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', padding: 20 }}>
      <h1>📝 Todo List</h1>

      <TodoForm onAdd={addTodo} />

      <Filters current={filter} onChange={setFilter} counts={counts} />

      {filter === 'done' && visibleTodos.length === 0 && counts.all > 0 && (
        <p style={{ color: '#f59e0b', fontStyle: 'italic' }}>
          Пока нет выполненных задач. Отметь что-нибудь ✅
        </p>
      )}

      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
