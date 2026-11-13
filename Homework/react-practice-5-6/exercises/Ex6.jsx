import { useState } from 'react';

const CITIES_BY_COUNTRY = {
    RU: ['Москва', 'Санкт-Петербург', 'Казань'],
    BY: ['Минск', 'Брест', 'Гродно'],
};

export default function Ex6() {
    const [country, setCountry] = useState('RU');
    const [city, setCity] = useState('');

    // Валидация зависит от выбранной страны
    let cityError = '';
    if (!city.trim()) {
        cityError = 'Введите город';
    } else if (!CITIES_BY_COUNTRY[country].includes(city.trim())) {
        cityError = `Для ${country} доступны только: ${CITIES_BY_COUNTRY[country].join(', ')}`;
    }

    return (
        <div style={{ maxWidth: 400, margin: '20px auto' }}>
            <h2>🌍 Страна и город</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <select
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                        setCity(''); // сбрасываем город при смене страны
                    }}
                >
                    <option value="RU">Россия</option>
                    <option value="BY">Беларусь</option>
                </select>

                <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Введите город..."
                />
                {cityError && <p style={{ color: 'red', margin: 0, fontSize: 13 }}>{cityError}</p>}
            </div>
        </div>
    );
}