import { useState } from 'react';

export default function Ex1Counter() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);

    return (
        <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8, marginBottom: 16 }}>
            <h3>1. Счётчик с шагом</h3>
            <p>Значение: <strong>{count}</strong></p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label>
                    Шаг:{' '}
                    <input
                        type="number"
                        value={step}
                        onChange={(e) => setStep(Number(e.target.value))}
                        style={{ width: 60, padding: 4 }}
                    />
                </label>
                <button onClick={() => setCount((prev) => prev - step)}>-{step}</button>
                <button onClick={() => setCount((prev) => prev + step)}>+{step}</button>
            </div>
        </div>
    );
}