import { useEffect, useRef, useState } from 'react';

export default function Ex9() {
    const [text, setText] = useState('');
    const [isIdle, setIsIdle] = useState(false);
    const timerRef = useRef(null);

    function resetTimer() {
        setIsIdle(false);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 30000); // 30 секунд (для быстрого теста можно поставить 5000)
    }

    // Запускаем таймер при открытии и чистим при закрытии компонента
    useEffect(() => {
        resetTimer();
        return () => clearTimeout(timerRef.current);
    }, []);

    function handleChange(e) {
        setText(e.target.value);
        resetTimer(); // пользователь активен — перезапускаем отсчёт
    }

    return (
        <div style={{ maxWidth: 400, margin: '20px auto' }}>
            <h2>⏳ Таймер активности (30 сек)</h2>
            <textarea
                value={text}
                onChange={handleChange}
                placeholder="Напишите что-нибудь и остановитесь..."
                rows={4}
                style={{ width: '100%' }}
            />
            {isIdle && (
                <div style={{ marginTop: 10, padding: 10, background: '#fef3c7', borderRadius: 6 }}>
                    👋 Вы всё ещё с нами? Продолжите заполнение формы.
                </div>
            )}
        </div>
    );
}