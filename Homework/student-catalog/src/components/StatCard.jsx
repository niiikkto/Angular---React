function StatCard({ label, value, color = '#f0f0f0', icon }) {
    return (
        <div
            style={{
                background: color,
                padding: '16px 20px',
                borderRadius: '10px',
                textAlign: 'center',
                flex: 1,
                minWidth: '160px',
            }}
        >
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {/* Если icon передан — выводим его с отступом перед значением */}
                {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
                {value}
            </div>
            <div style={{ fontSize: '13px', color: '#555', marginTop: 4 }}>
                {label}
            </div>
        </div>
    );
}

export default StatCard;