import { useState } from 'react';

export default function Ex2() {
    const [city, setCity] = useState('Moscow');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSearch(e) {
        e.preventDefault();
        if (!city.trim()) return;

        setLoading(true);
        setError(null);
        setWeather(null);

        try {
            // Шаг 1: Получаем координаты города
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru`
            );
            if (!geoRes.ok) throw new Error('Ошибка поиска города');
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error('Город не найден');
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // Шаг 2: Получаем текущую погоду по координатам
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );
            if (!weatherRes.ok) throw new Error('Ошибка получения погоды');
            const weatherData = await weatherRes.json();

            setWeather({
                location: `${name} (${country})`,
                temp: weatherData.current_weather.temperature,
                wind: weatherData.current_weather.windspeed,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: 450, margin: '20px auto' }}>
            <h2>🌤️ Прогноз погоды</h2>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
                <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Введите город..."
                />
                <button type="submit" disabled={loading}>Найти</button>
            </form>

            {loading && <p>Ищем погоду...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weather && (
                <div style={{ marginTop: 16, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
                    <h3>{weather.location}</h3>
                    <p>Температура: <strong>{weather.temp}°C</strong></p>
                    <p>Ветер: {weather.wind} км/ч</p>
                </div>
            )}
        </div>
    );
}