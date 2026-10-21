import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // lazy initializer: localStorage читается только один раз, при первом рендере
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
    } catch {
      // битый JSON или недоступный storage — падаем на значение по умолчанию
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // переполнение квоты / приватный режим — молча игнорируем
    }
  }, [key, value]);

  return [value, setValue];
}
