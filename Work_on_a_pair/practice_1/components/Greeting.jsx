function Greeting({ name, greeting = 'Привет' }) {
    // Fallback: если имя не передали (или передали пустую строку),
    // показываем «гость» вместо "undefined"
    const displayName = name || 'гость';

    return (
        <p>
            {greeting}, {displayName}!
        </p>
    );
}

export default Greeting;