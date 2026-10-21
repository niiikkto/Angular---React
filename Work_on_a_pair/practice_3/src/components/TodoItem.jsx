import { useState } from 'react';

// Один элемент списка. Принимает:
//   todo — объект задачи
//   onToggle — переключить done
//   onDelete — удалить
//   onEdit — сохранить новое название
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  // Локальное состояние редактирования — НЕ нужно родителю
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // Цвет левой полоски по приоритету
  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  function handleSave() {
    const trimmed = editText.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text); // откатываем изменения
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  // Функция для красивого форматирования даты и времени из id (timestamp)
  function formatCreatedAt(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 12px 12px 8px',
        borderBottom: '1px solid #eee',
        borderLeft: `4px solid ${priorityColors[todo.priority]}`,
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      {/* Условный рендер: редактируем или показываем текст вместе с датой создания */}
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ flex: 1, padding: 6, borderRadius: 6, border: '1px solid #ddd' }}
        />
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span
            onDoubleClick={() => setIsEditing(true)}
            style={{
              cursor: 'pointer',
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#999' : '#1e293b',
              textAlign: 'left',
            }}
          >
            {todo.text}
          </span>
          {/* Маленький блок с датой и временем создания */}
          <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: 4 }}>
            🕒 {formatCreatedAt(todo.id)}
          </span>
        </div>
      )}

      {/* Кнопки: показать в режиме редактирования, иначе — удалить */}
      {isEditing ? (
        <>
          <button onClick={handleSave} style={{ cursor: 'pointer' }}>
            💾
          </button>
          <button onClick={handleCancel} style={{ cursor: 'pointer' }}>
            ✖️
          </button>
        </>
      ) : (
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 18,
            color: '#ef4444',
          }}
        >
          ✕
        </button>
      )}
    </li>
  );
}

export default TodoItem;
