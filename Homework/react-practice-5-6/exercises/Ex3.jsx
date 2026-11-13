import { useEffect, useState } from 'react';

export default function Ex3() {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`, {
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => {
                if (err.name !== 'AbortError') console.error(err);
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [page]);

    return (
        <div style={{ maxWidth: 600, margin: '20px auto' }}>
            <h2>📄 Посты (Страница {page})</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} style={{ marginBottom: 8 }}>
                            <strong>#{post.id}</strong> {post.title}
                        </li>
                    ))}
                </ul>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || loading}>
                    ← Назад
                </button>
                <span>Страница {page}</span>
                {/* У JSONPlaceholder всего 100 постов (10 страниц по 10) */}
                <button onClick={() => setPage((p) => p + 1)} disabled={page >= 10 || loading}>
                    Вперёд →
                </button>
            </div>
        </div>
    );
}