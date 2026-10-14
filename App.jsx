import Greeting from './components/Greeting';
import Product from './components/Product';
import Avatar from './components/Avatar';
import Card from './components/Card';
import Button from './components/Button';

function App() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h1>Практика React</h1>

      {/* Задача 1: Greeting — три варианта */}
      <Card title="Задача 1: Greeting">
        <Greeting name="Иван" />
        <Greeting name="Анна" greeting="Здравствуй" />
        <Greeting />   {/* без имени, сработает fallback «гость» */}
      </Card>

      {/* Задача 2: Product */}
      <Card title="Задача 2: Product">
        <Product title="Ноутбук" price={50000} discount={15} />
        <Product title="Мышь" price={1500} />
        <Product title="Клавиатура" price={4000} discount={25} />
      </Card>

      {/* Задача 3: аватары трёх размеров */}
      <Card title="Задача 3: Avatar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name="Анна" size={32} />
          <Avatar name="Пётр" />
          <Avatar name="Мария" size={80} />
        </div>
      </Card>

      {/* Задача 4: Card с разным содержимым */}
      <Card title="Задача 4: Card со списком">
        <ul>
          <li>JavaScript</li>
          <li>React</li>
          <li>CSS</li>
        </ul>
      </Card>

      <Card title="Задача 4: Card с текстом и кнопкой">
        <p>Это обычный текст внутри карточки.</p>
        <Button onClick={() => alert('Привет!')}>Нажми меня</Button>
      </Card>

      {/* Задача 5: все варианты кнопок */}
      <Card title="Задача 5: Button">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger" onClick={() => alert('Удалено!')}>
          Danger
        </Button>
        <Button disabled>Отключена</Button>
        <Button variant="danger" disabled>Danger disabled</Button>
      </Card>
    </div>
  );
}

export default App;