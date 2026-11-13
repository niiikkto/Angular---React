import { useState } from 'react';

export default function Ex2Theme() {
    const [theme, setTheme] = useState('light');
    const isDark = theme === 'dark';

    return (
        <div
            style={{
                padding: 16,
                borderRadius: 8,
                marginBottom: 16,
                border: '1px solid #ccc',
                background: isDark ? '#1e293b' : '#ffffff',
                color: isDark ? '#f8fafc' : '#1e293b',
                transition: '0.2s',
            }}
        >
            <h3>2. Переключатель темы</h3>
            <p>Текущая тема: {isDark ? 'Тёмная 🌙' : 'Светлая ☀️'}</p>
            <button onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}>
                Переключить тему
            </button>
        </div>
    );
}