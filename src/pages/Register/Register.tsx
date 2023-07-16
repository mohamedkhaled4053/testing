import { governorates, studyLevels } from '../../utils/constants';
import { FormRow } from '../../components/form/FormRow';
import { FormRowSelect } from '../../components/form/FormRowSelect';
import { useAppContext } from '../../context/AppContext';
import { signupBody } from '../../types/types';
import { Navigate, Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

let initialState: signupBody = {
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
  fatherPhone: '',
  level: 'الصف الأول الثانوي',
  governorate: 'القاهرة',
};

export const Register = () => {
  let { signup, loading, user, admin } = useAppContext();
  let { values, handleChange } = useForm(initialState);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signup(values);
  }
  useEffect(() => {
    toast.info(
      'يرجى العلم ان الجهاز الذى سوف تنشئ منه حسابك هو الجهاز الوحيد الذى يمكنك الدخول منه، و إذا احتجت تغير الجهاز تواصل معنا',
      { autoClose: 15000 },
    );
  }, []);

  if (user || admin) return <Navigate to="/" />;

  return (
    <div className="login full-page">
      <form className="form" onSubmit={handleSubmit}>
        <FormRow
          name="name"
          type="text"
          labelText="الاسم"
          value={values.name}
          handleChange={handleChange}
        />
        <FormRow
          name="phone"
          type="number"
          labelText="رقم التليفون"
          value={values.phone}
          handleChange={handleChange}
        />
        <FormRow
          name="password"
          type="password"
          labelText="كلمة السر"
          value={values.password}
          handleChange={handleChange}
        />
        <FormRow
          name="confirmPassword"
          type="password"
          labelText="تأكيد كلمة السر"
          value={values.confirmPassword}
          handleChange={handleChange}
        />
        <FormRow
          name="fatherPhone"
          type="number"
          labelText="رقم تليفون ولى الأمر"
          value={values.fatherPhone}
          handleChange={handleChange}
        />
        <FormRowSelect
          name="level"
          labelText="الصف الدراسي"
          value={values.level}
          list={studyLevels}
          handleChange={handleChange}
        />
        <FormRowSelect
          name="governorate"
          labelText="المحافظة"
          value={values.governorate}
          list={governorates}
          handleChange={handleChange}
        />

        <div className="form-footer">
          <button type="submit" disabled={loading}>
            {!loading ? 'سجل' : 'loading'}
          </button>
          <span style={{ marginRight: '20px' }}>
            لو عملت حساب قبل كدا ادخل <Link to="/login">من هنا</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
