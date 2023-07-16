import { NavLink, Navigate, Outlet } from 'react-router-dom';
import './style.scss';
import { useAppContext } from '../../context/AppContext';

type Props = {};

export const Admin = (props: Props) => {
  let { admin } = useAppContext();
  const links = ['users', 'courses', 'videos', 'exams'];

  if (!admin) return <Navigate to={'/login'} />;

  return (
    <div className="admin">
      <aside>
        {links.map((link) => (
          <NavLink key={link} to={`/admin/${link !== 'users' ? link : ''}`}>
            {link}
          </NavLink>
        ))}
        {admin.type === 'central' && (
          <NavLink to={`/admin/admins`}>admins</NavLink>
        )}
      </aside>
      <div className="admin-dashboard">
        <Outlet />
      </div>
    </div>
  );
};
