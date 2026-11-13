import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [error, setError] = useState(false); // Упр. 9: состояние ошибки

    const priorityColors = {
        low: '#10b981',
        medium: '#f59e0b',
        high: '#ef4444',
    };

    function handleSave() {
        const trimmed = editText.trim();
        // Упр. 9: Валидация — не даём сохранить пустую строку
        if (!trimmed) {
            setError(true);
            return;
        }
        setError(false);
        onEdit(todo.id, trimmed);
        setIsEditing(false);
    }

    function handleCancel() {
        setEditText(todo.text);
        setError(false);
        setIsEditing(false);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') handleCancel();
    }

    return (
        <li
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '12px 12px 12px 8px',
                borderBottom: '1px solid #eee',
                borderLeft: `4px solid ${priorityColors[todo.priority]}`,
                background: 'white',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => onToggle(todo.id)}
                />

                {isEditing ? (
                    <input
                        value={editText}
                        onChange={(e) => {
                            setEditText(e.target.value);
                            if (error) setError(false);
                        }}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        style={{
                            flex: 1,
                            padding: 6,
                            borderRadius: 6,
                            border: error ? '1px solid #ef4444' : '1px solid #ddd',
                        }}
                    />
                ) : (
                    <span
                        onDoubleClick={() => setIsEditing(true)}
                        style={{
                            flex: 1,
                            cursor: 'pointer',
                            textDecoration: todo.done ? 'line-through' : 'none',
                            color: todo.done ? '#999' : '#1e293b',
                        }}
                    >
                        {todo.text}
                    </span>
                )}

                {isEditing ? (
                    <>
                        <button onClick={handleSave} style={{ cursor: 'pointer' }}>💾</button>
                        <button onClick={handleCancel} style={{ cursor: 'pointer' }}>✖️</button>
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
            </div>

            {/* Упр. 9: Вывод ошибки валидации */}
            {error && (
                <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, marginLeft: 24 }}>
                    Название задачи не может быть пустым!
                </span>
            )}
        </li>
    );
}

export default TodoItem;