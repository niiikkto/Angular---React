const colors = {
    primary: '#3b82f6',
    secondary: '#6b7280',
    danger: '#ef4444',
};

function Button({ children, variant = 'primary', onClick, disabled = false }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                background: colors[variant],
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '8px 16px',
                fontSize: 14,
                marginRight: 8,
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
            }}
        >
            {children}
        </button>
    );
}

export default Button;