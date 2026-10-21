import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      {/* Всё внутри Layout получает шапку через <Outlet /> */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/:taskId" element={<TaskDetailsPage />} />
      </Route>
      {/* 404 — на уровне корня, вне Layout, поэтому без шапки */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
