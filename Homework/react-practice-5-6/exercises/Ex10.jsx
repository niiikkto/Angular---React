import { useState } from 'react';

export default function Ex10() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        fullName: '',
        phone: '',
        city: '',
        street: '',
    });

    function updateField(e) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    // Валидация зависит от текущего шага
    const isStep1Valid = data.fullName.trim().length >= 2 && data.phone.trim().length >= 6;
    const isStep2Valid = data.city.trim().length >= 2 && data.street.trim().length >= 3;

    function handleFinalSubmit(e) {
        e.preventDefault();
        alert(`Заказ оформлен на: ${data.fullName}, г. ${data.city}, ул. ${data.street}`);
        setStep(1);
        setData({ fullName: '', phone: '', city: '', street: '' });
    }

    return (
        <div style={{ maxWidth: 420, margin: '20px auto' }}>
            <h2>🪜 Оформление заказа (Шаг {step} из 3)</h2>

            <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {step === 1 && (
                    <>
                        <input name="fullName" value={data.fullName} onChange={updateField} placeholder="ФИО" />
                        <input name="phone" value={data.phone} onChange={updateField} placeholder="Телефон" />
                        <button type="button" onClick={() => setStep(2)} disabled={!isStep1Valid}>
                            Далее →
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <input name="city" value={data.city} onChange={updateField} placeholder="Город" />
                        <input name="street" value={data.street} onChange={updateField} placeholder="Улица и дом" />
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button type="button" onClick={() => setStep(1)}>← Назад</button>
                            <button type="button" onClick={() => setStep(3)} disabled={!isStep2Valid}>
                                Далее →
                            </button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div style={{ background: '#f3f4f6', padding: 12, borderRadius: 8 }}>
                            <p><strong>Получатель:</strong> {data.fullName}</p>
                            <p><strong>Телефон:</strong> {data.phone}</p>
                            <p><strong>Адрес:</strong> г. {data.city}, {data.street}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button type="button" onClick={() => setStep(2)}>← Назад</button>
                            <button type="submit">Подтвердить</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}