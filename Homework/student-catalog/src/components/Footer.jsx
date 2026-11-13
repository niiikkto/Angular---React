function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            style={{
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '1px solid #e2e8f0',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '14px',
            }}
        >
            <p style={{ margin: 0 }}>
                © {currentYear} Каталог студентов. Учебный проект на React.
            </p>
        </footer>
    );
}

export default Footer;