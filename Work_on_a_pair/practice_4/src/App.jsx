import { useState } from 'react';
import TodoForm from './components/TodoForm';
import Filters from './components/Filters';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить useState', done: true, priority: 'high' },
    { id: 2, text: 'Разобраться со списками', done: false, priority: 'medium' },
    { id: 3, text: 'Сделать todo', done: false, priority: 'low' },
  ]);


  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');


  function addTodo({ text, priority }) {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, priority, done: false },
    ]);
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


  function handleToggleAll() {
    const areAllDone = todos.every((t) => t.done);
    setTodos((prev) => prev.map((t) => ({ ...t, done: !areAllDone })));
  }

  function handleClearDone() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  function handleClearAll() {
    setTodos([]);
  }


  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
  };


  const progressPercent =
    counts.all === 0 ? 0 : Math.round((counts.done / counts.all) * 100);


  const processedTodos = todos

    .filter((t) => {
      if (filter === 'active') return !t.done;
      if (filter === 'done') return t.done;
      return true;
    })

    .filter((t) => {
      if (priorityFilter === 'all') return true;
      return t.priority === priorityFilter;
    })

    .filter((t) =>
      t.text.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )

    .sort((a, b) => {
      if (sortBy === 'alpha') {
        return a.text.localeCompare(b.text, 'ru');
      }
      return a.id - b.id; // по умолчанию по порядку добавления
    });

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h1> Todo List Pro</h1>

      { }
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
          <span>Прогресс выполнения:</span>
          <strong>{counts.done} / {counts.all} ({progressPercent}%)</strong>
        </div>
        <div style={{ width: '100%', height: 10, background: '#e2e8f0', borderRadius: 5, overflow: 'hidden' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: '#10b981',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      { }
      <TodoForm onAdd={addTodo} />

      { }
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder=" Поиск задач..."
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ddd' }}
        />
        <button
          onClick={() => setSortBy((prev) => (prev === 'date' ? 'alpha' : 'date'))}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}
        >
          Сортировка: {sortBy === 'date' ? 'По дате' : '🔤 По алфавиту'}
        </button>
      </div>

      { }
      <Filters current={filter} onChange={setFilter} counts={counts} />

      { }
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 16, fontSize: 14 }}>
        <span style={{ color: '#64748b' }}>Приоритет:</span>
        {[
          { key: 'all', label: 'Все' },
          { key: 'high', label: 'Высокий' },
          { key: 'medium', label: 'Средний' },
          { key: 'low', label: 'Низкий' },
        ].map((p) => (
          <button
            key={p.key}
            onClick={() => setPriorityFilter(p.key)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid #ddd',
              background: priorityFilter === p.key ? '#1e293b' : 'white',
              color: priorityFilter === p.key ? 'white' : '#374151',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      { }
      <TodoList
        todos={processedTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      { }
      {todos.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid #e2e8f0',
            justifyContent: 'space-between',
          }}
        >
          <button onClick={handleToggleAll} style={bulkBtnStyle}>
            Отметить все
          </button>
          <button onClick={handleClearDone} style={bulkBtnStyle} disabled={counts.done === 0}>
            Удалить выполненные
          </button>
          <button onClick={handleClearAll} style={{ ...bulkBtnStyle, color: '#ef4444' }}>
            Очистить всё
          </button>
        </div>
      )}
    </div>
  );
}

const bulkBtnStyle = {
  padding: '6px 12px',
  borderRadius: 6,
  border: '1px solid #cbd5e1',
  background: 'white',
  cursor: 'pointer',
  fontSize: 13,
};

export default App;