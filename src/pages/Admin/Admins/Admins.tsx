import { useState, useEffect } from 'react';
import { IAdmin } from '../../../types/types';
import { useAppContext } from '../../../context/AppContext';
import { Link } from 'react-router-dom';
import './style.scss';
import { Loading } from '../../../components/Loading/Loading';

export const Admins = () => {
  let { api, admin } = useAppContext();
  let [admins, setAdmins] = useState<IAdmin[]>([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAdmins() {
      setLoading(true);
      try {
        let admins = await api
          .get('/admin/admins', {
            headers: { Authorization: `bearer ${admin?.token}` },
          })
          .then((res) => res.data);
        setAdmins(admins);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAdmins();
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loading page />;

  return (
    <div className="admins full-page">
      <Link to="/admin/admin-form" className="button">
        إضافة أدمن
      </Link>
      <div className="header-card">
        <span className="name">name</span>
        <span className="email">email</span>
        <span className="type">type</span>
      </div>
      {admins.map(({ _id, name, email, type }) => (
        <Link to={`admins/${_id}`} key={_id} className="admin-card">
          <span className="name">{name}</span>
          <span className="email">{email}</span>
          <span className="type">{type}</span>
        </Link>
      ))}
    </div>
  );
};
