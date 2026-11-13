import { useState } from 'react';

export default function Ex4ShoppingList() {
    const [items, setItems] = useState([
        { id: 1, name: 'Молоко' },
        { id: 2, name: 'Хлеб' },
    ]);
    const [product, setProduct] = useState('');

    function handleAdd(e) {
        e.preventDefault();
        if (!product.trim()) return;
        setItems((prev) => [...prev, { id: Date.now(), name: product.trim() }]);
        setProduct('');
    }

    function handleRemove(id) {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }

    return (
        <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8, marginBottom: 16 }}>
            <h3>4. Список покупок</h3>
            <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <input
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="Название товара..."
                />
                <button type="submit">Добавить</button>
            </form>
            <ul>
                {items.map((item) => (
                    <li key={item.id} style={{ marginBottom: 4 }}>
                        {item.name}{' '}
                        <button onClick={() => handleRemove(item.id)} style={{ color: 'red' }}>
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}