import { useEffect, useState } from 'react';

export default function Ex4() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const controller = new AbortController();

        // Ждём 500 мс перед отправкой запроса
        const timerId = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://jsonplaceholder.typicode.com/users?name_like=${encodeURIComponent(query)}`,
                    { signal: controller.signal }
                );
                const data = await res.json();
                setResults(data);
            } catch (err) {
                if (err.name !== 'AbortError') console.error(err);
            } finally {
                setLoading(false);
            }
        }, 500);

        // Если query изменился до истечения 500 мс — сбрасываем таймер и отменяем запрос
        return () => {
            clearTimeout(timerId);
            controller.abort();
        };
    }, [query]);

    return (
        <div style={{ maxWidth: 450, margin: '20px auto' }}>
            <h2>🔍 Поиск с Debounce (500 мс)</h2>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Начните вводить имя (например, Leanne)..."
                style={{ width: '100%', padding: 8 }}
            />
            {loading && <p>Поиск...</p>}
            <ul>
                {results.map((u) => (
                    <li key={u.id}>{u.name} ({u.email})</li>
                ))}
            </ul>
        </div>
    );
}