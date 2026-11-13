import { useState } from 'react';

export default function Ex3Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Кнопка активна, только если оба поля не пустые
    const isFormValid = email.trim() !== '' && password.trim() !== '';

    function handleSubmit(e) {
        e.preventDefault();
        alert(`Вход выполнен!\nEmail: ${email}\nПароль: ${password}`);
        setEmail('');
        setPassword('');
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8, marginBottom: 16 }}
        >
            <h3>3. Форма логина</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 250 }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={!isFormValid}>
                    Войти
                </button>
            </div>
        </form>
    );
}