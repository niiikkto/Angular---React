import { useState } from 'react';

export default function Ex5() {
    const [form, setForm] = useState({ name: '', rating: 5, text: '' });
    const [reviews, setReviews] = useState([]);

    // Вычисляем валидность без хранения ошибок в state
    const isNameValid = form.name.trim().length >= 2;
    const isTextValid = form.text.trim().length >= 10;
    const isValid = isNameValid && isTextValid;

    function handleSubmit(e) {
        e.preventDefault();
        if (!isValid) return;

        setReviews((prev) => [{ ...form, id: Date.now() }, ...prev]);
        setForm({ name: '', rating: 5, text: '' }); // сброс
    }

    return (
        <div style={{ maxWidth: 450, margin: '20px auto' }}>
            <h2>⭐ Оставить отзыв</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                    placeholder="Ваше имя (от 2 букв)"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                >
                    {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>Оценка: {n} ★</option>
                    ))}
                </select>
                <textarea
                    placeholder="Текст отзыва (минимум 10 символов)"
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    rows={3}
                />
                <button type="submit" disabled={!isValid}>Отправить отзыв</button>
            </form>

            <div style={{ marginTop: 20 }}>
                {reviews.map((r) => (
                    <div key={r.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
                        <strong>{r.name}</strong> — {'★'.repeat(r.rating)}
                        <p style={{ margin: '4px 0' }}>{r.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}