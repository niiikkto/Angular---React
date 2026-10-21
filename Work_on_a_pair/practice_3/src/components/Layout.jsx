import { NavLink, Outlet } from 'react-router-dom';

const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

export default function Layout() {
  return (
    <>
      <header className="header">
        <strong>Мои задачи</strong>
        <nav>
          <NavLink to="/" end className={linkClass}>
            Главная
          </NavLink>
          <NavLink to="/tasks" className={linkClass}>
            Задачи
          </NavLink>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
