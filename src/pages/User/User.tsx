import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { IUser } from '../../types/types';
import { useAppContext } from '../../context/AppContext';
import './style.scss';
import { FormRowArray } from '../../components/form/FormRowArray';
import { useSharedContext } from '../../context/SharedContext';
import { Loading } from '../../components/Loading/Loading';
import { toast } from 'react-toastify';

export const User = () => {
  let { api, admin } = useAppContext();
  let { courses } = useSharedContext();
  let [user, setUser] = useState<IUser>();
  let [userCourses, setUserCourses] = useState<string[]>();
  let [loading, setLoading] = useState(true);

  let { id: userId } = useParams();

  let navigate = useNavigate();

  async function getUser() {
    setLoading(true);
    try {
      let user = await api
        .get(`/admin/user/${userId}`, {
          headers: { Authorization: `bearer ${admin?.token}` },
        })
        .then((res) => res.data);
      setUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (user) setUserCourses(user.courses);
    //eslint-disable-next-line
  }, [user]);

  async function saveCourses() {
    try {
      await api.put(
        `/admin/update-user-courses`,
        {
          userId,
          courses: userCourses,
        },
        { headers: { Authorization: `bearer ${admin?.token}` } },
      );
      getUser();
    } catch (error) {
      console.log(error);
    }
  }
  async function resetDevice() {
    try {
      let {
        data: { message },
      } = await api.put(
        `admin/user-device/${userId}`,
        {},
        {
          headers: { Authorization: `bearer ${admin?.token}` },
        },
      );
      toast.success(message);
      getUser();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser() {
    try {
      let {
        data: { message },
      } = await api.delete(`admin/user/${userId}`, {
        headers: { Authorization: `bearer ${admin?.token}` },
      });
      toast.success(message);
      navigate('/admin');
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return <Loading page />;

  return (
    <div className="full-page">
      <div className="user">
        <div className="user-row">
          <p>الكود: </p>
          <p>{user?._id}</p>
        </div>
        <div className="user-row">
          <p>الاسم: </p>
          <p>{user?.name}</p>
        </div>
        <div className="user-row">
          <p>الهاتف: </p>
          <p>{user?.phone}</p>
        </div>
        <div className="user-row">
          <p>هاتف ولى الامر: </p>
          <p>{user?.fatherPhone}</p>
        </div>
        <div className="user-row">
          <p>الصف: </p>
          <p>{user?.level}</p>
        </div>
        <div className="user-row">
          <p>المحافظة: </p>
          <p>{user?.governorate}</p>
        </div>
        <div className="user-row password">
          <p>كلمة السر: </p>
          <p>{user?.password}</p>
        </div>

        <FormRowArray
          name="courses"
          labelText="الكورسات"
          list={courses.filter((course) => course.level === user?.level)}
          handleChange={(val) => setUserCourses(val)}
          defaultValue={userCourses}
        />
        <div className="user-buttons">
          <button type="submit" onClick={saveCourses}>
            حفظ
          </button>
          <button type="submit" onClick={resetDevice}>
            ضبط الجهاز
          </button>
          <button type="submit" onClick={deleteUser}>
            حذف الطالب
          </button>
        </div>
      </div>
    </div>
  );
};
