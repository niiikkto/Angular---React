import { useEffect, useState } from 'react';

export default function Ex1() {
    const [fact, setFact] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(0); // меняем число, чтобы перезапустить эффект

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        fetch('https://catfact.ninja/fact', { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
                return res.json();
            })
            .then((data) => setFact(data.fact))
            .catch((err) => {
                if (err.name !== 'AbortError') setError(err.message);
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [trigger]);

    return (
        <div style={{ maxWidth: 500, margin: '20px auto' }}>
            <h2>🐱 Факт о кошках</h2>
            {loading && <p>Загрузка факта...</p>}
            {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
            {!loading && !error && <p style={{ fontSize: 18 }}>{fact}</p>}

            <button onClick={() => setTrigger((c) => c + 1)} disabled={loading}>
                Ещё факт
            </button>
        </div>
    );
}