function Product({ title, price, discount = 0 }) {
    // Цена после скидки считается прямо внутри компонента
    const finalPrice = price - (price * discount) / 100;

    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
                background: 'white',
            }}
        >
            <h4 style={{ margin: '0 0 8px' }}>{title}</h4>

            <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                {finalPrice.toFixed(2)} ₽
            </div>

            {/* Блок показываем только если скидка больше 0 */}
            {discount > 0 && (
                <div style={{ marginTop: 6 }}>
                    <s style={{ color: '#888' }}>{price} ₽</s>
                    <span style={{ color: '#ef4444', marginLeft: 10 }}>
                        Скидка: {discount}%
                    </span>
                </div>
            )}
        </div>
    );
}

export default Product;