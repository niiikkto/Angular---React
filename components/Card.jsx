function Card({ title, children }) {
    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
                background: 'white',
            }}
        >
            <h3 style={{ marginTop: 0 }}>{title}</h3>
            {children}
        </div>
    );
}

export default Card;