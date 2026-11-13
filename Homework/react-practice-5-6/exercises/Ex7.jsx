import { useRef, useState } from 'react';

export default function Ex7() {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const loginRef = useRef(null);
    const emailRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();

        if (login.trim().length < 3) {
            setError('Логин должен быть от 3 символов');
            loginRef.current.focus(); // ставим фокус на логин
            return;
        }

        if (!email.includes('@')) {
            setError('Введите корректный Email');
            emailRef.current.focus(); // ставим фокус на email
            return;
        }

        setError('');
        alert('Форма успешно отправлена!');
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: '20px auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h2>🎯 Фокус на ошибку</h2>
            <input ref={loginRef} value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" />
            <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
            <button type="submit">Проверить</button>
        </form>
    );
}