import Badge from './Badge';
import SkillsList from './SkillsList';

function StudentCard({ student }) {
    const { name, age, course, city, gpa, skills } = student;

    function renderStars(rating) {
        const fullStars = Math.round(rating);
        const emptyStars = 5 - fullStars;
        return '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);
    }

    const courseColor = course >= 3 ? '#28a745' : '#0284c7';

    // Задание 5: ссылка на сгенерированный аватар
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
    )}&background=random&color=fff`;

    return (
        <div
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '20px',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <div>
                {/* Шапка карточки: аватар, имя и бейджи */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: 14,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Задание 5: вывод аватара */}
                        <img
                            src={avatarUrl}
                            alt={name}
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                flexShrink: 0,
                            }}
                        />
                        <div>
                            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{name}</h3>
                            {/* Задание 3: условный рендер значка отличника */}
                            {gpa >= 4.5 && <Badge text="🏆 Отличник" color="#f59e0b" />}
                        </div>
                    </div>

                    {/* Задание 2: компонент Badge вместо инлайн-стилей */}
                    <Badge text={`${course} курс`} color={courseColor} />
                </div>

                {/* Основная информация */}
                <p style={{ margin: '6px 0', color: '#555' }}>
                    <strong>Возраст:</strong> {age} лет
                </p>
                <p style={{ margin: '6px 0', color: '#555' }}>
                    <strong>Город:</strong> {city}
                </p>
                <p style={{ margin: '6px 0', color: '#555' }}>
                    <strong>Средний балл:</strong> {gpa} {renderStars(gpa)}
                </p>
            </div>

            {/* Задание 6: вынесенный компонент списка навыков */}
            <SkillsList skills={skills} />
        </div>
    );
}

export default StudentCard;