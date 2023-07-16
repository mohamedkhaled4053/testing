import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { IUser } from '../../../types/types';
import { useAppContext } from '../../../context/AppContext';
import { Link } from 'react-router-dom';
import './style.scss';
import { useForm } from '../../../hooks/useForm';
import { FormRowSelect } from '../../../components/form/FormRowSelect';
import { FormRow } from '../../../components/form/FormRow';
import { governorates, studyLevels } from '../../../utils/constants';
import { Slider } from 'antd';
import { Loading } from '../../../components/Loading/Loading';

interface Filters {
  phone: string;
  governorate: string;
  level: string;
  coursesNum: [number, number];
}

let initialFilters: Filters = {
  phone: '',
  governorate: '',
  level: '',
  coursesNum: [0, 20],
};

export const Users = () => {
  let { api, admin } = useAppContext();
  let [users, setUsers] = useState<IUser[]>([]);
  let [count, setCount] = useState(0);
  let [loading, setLoading] = useState(true);

  let { values: filters, setValues, handleChange } = useForm(initialFilters);

  async function getUsers() {
    setLoading(true);
    try {
      let { users, count } = await api
        .post(
          '/admin/users',
          { filters },
          {
            headers: { Authorization: `bearer ${admin?.token}` },
          },
        )
        .then((res) => res.data);
      setUsers(users);
      setCount(count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleFilter(e: FormEvent) {
    e.preventDefault();
    getUsers();
  }
  function handleReset(e: FormEvent) {
    e.preventDefault();
    setValues((prevState) => {
      return initialFilters;
    });
  }

  useEffect(() => {
    getUsers();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="users full-page">
      <div className="filters">
        <form onSubmit={handleFilter} onReset={handleReset}>
          <FormRow
            name="phone"
            type="number"
            labelText="الهاتف"
            value={filters.phone}
            handleChange={handleChange}
          />
          <FormRowSelect
            name="governorate"
            labelText="المحافطة"
            value={filters.governorate}
            list={governorates}
            handleChange={handleChange}
          />
          <FormRowSelect
            name="level"
            labelText="الصف"
            value={filters.level}
            list={studyLevels}
            handleChange={handleChange}
          />

          <Slider
            range
            min={0}
            max={20}
            value={filters.coursesNum}
            onChange={(val) => setValues({ ...filters, coursesNum: val })}
          />

          <div className="filter-buttons">
            <button type="submit" disabled={loading}>
              {loading ? 'loading' : 'بحث'}
            </button>
            <button type="reset" disabled={loading}>
              {loading ? 'loading' : 'إلغاء'}
            </button>
            {admin?.type === 'central' && <span>{count}</span>}
          </div>
        </form>
      </div>
      <div className="header-card">
        <span className="name">الإسم</span>
        <span className="phone">الهاتف</span>
        <span className="level">الصف</span>
        <span className="gov">المحافظة</span>
        <span className="courses-num">الكورسات</span>
      </div>
      {loading ? (
        <Loading page />
      ) : users.length === 0 ? (
        <div className="full-page">no users</div>
      ) : (
        users.map(({ _id, courses, governorate, level, name, phone }) => (
          <Link to={`users/${_id}`} key={_id} className="user-card">
            <span className="name">{name}</span>
            <span className="phone">{phone}</span>
            <span className="level">
              {level.replace('الصف ', '').replace(' الثانوي', '')}
            </span>
            <span className="gov">{governorate}</span>
            <span className="courses-num">{courses.length}</span>
          </Link>
        ))
      )}
    </div>
  );
};
