import { useState } from 'react';
import Practice5 from './practices/Practice5';
import Practice6 from './practices/Practice6';
import Ex1 from './exercises/Ex1';
import Ex2 from './exercises/Ex2';
import Ex3 from './exercises/Ex3';
import Ex4 from './exercises/Ex4';
import Ex5 from './exercises/Ex5';
import Ex6 from './exercises/Ex6';
import Ex7 from './exercises/Ex7';
import Ex8 from './exercises/Ex8';
import Ex9 from './exercises/Ex9';
import Ex10 from './exercises/Ex10';

const TASKS = {
  'Практ. 5': <Practice5 />,
  'Практ. 6': <Practice6 />,
  'Упр. 1': <Ex1 />,
  'Упр. 2': <Ex2 />,
  'Упр. 3': <Ex3 />,
  'Упр. 4': <Ex4 />,
  'Упр. 5': <Ex5 />,
  'Упр. 6': <Ex6 />,
  'Упр. 7': <Ex7 />,
  'Упр. 8': <Ex8 />,
  'Упр. 9': <Ex9 />,
  'Упр. 10': <Ex10 />,
};

export default function App() {
  const [active, setActive] = useState('Практ. 5');

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
        {Object.keys(TASKS).map((label) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            style={{
              padding: '6px 12px',
              background: active === label ? '#3b82f6' : '#e5e7eb',
              color: active === label ? '#fff' : '#000',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <hr />
      {TASKS[active]}
    </div>
  );
}