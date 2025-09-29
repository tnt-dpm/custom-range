import { NavLink, Outlet } from 'react-router-dom';
import './layout.scss';

const Layout = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `layout__link${isActive ? ' layout__link--active' : ''}`;

  return (
    <div className="layout">
      <aside className="layout__sidebar">
        <h2 className="layout__title">Mango Range</h2>
        <nav className="layout__nav">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/exercise1" className={linkClass}>Exercise 1</NavLink>
          <NavLink to="/exercise2" className={linkClass}>Exercise 2</NavLink>
        </nav>
      </aside>

      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
