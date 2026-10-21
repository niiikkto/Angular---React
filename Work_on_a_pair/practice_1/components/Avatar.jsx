function Avatar({ name, size = 48 }) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: '#6366f1',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: size / 2,      // буква пропорциональна размеру
                fontWeight: 'bold',
            }}
        >
            {name[0].toUpperCase()}
        </div>
    );
}

export default Avatar;