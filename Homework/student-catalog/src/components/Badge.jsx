function Badge({ text, color = '#64748b' }) {
    return (
        <span
            style={{
                background: color,
                color: 'white',
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                display: 'inline-block',
            }}
        >
            {text}
        </span>
    );
}

export default Badge;