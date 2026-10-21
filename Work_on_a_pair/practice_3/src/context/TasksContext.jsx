import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const STORAGE_KEY = 'tasks-app:v1';

const createDemoTasks = () => {
  const now = Date.now();
  return [
    {
      id: crypto.randomUUID(),
      title: 'Изучить React Router',
      description: 'Разобраться с вложенными маршрутами и Outlet',
      done: true,
      createdAt: new Date(now - 3 * 86400000).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Написать хук useLocalStorage',
      description: 'С lazy initializer и записью в effect',
      done: false,
      createdAt: new Date(now - 2 * 86400000).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Собрать приложение «Мои задачи»',
      description: '',
      done: false,
      createdAt: new Date(now - 86400000).toISOString(),
    },
  ];
};

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  // Единый источник правды для всех страниц
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, createDemoTasks);

  const addTask = (title, description) => {
    const task = {
      id: crypto.randomUUID(),
      title,
      description,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const removeTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used inside <TasksProvider>');
  return ctx;
}
