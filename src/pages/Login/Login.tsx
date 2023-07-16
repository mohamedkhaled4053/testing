import './style.scss';
import { FormRow } from '../../components/form/FormRow';
import { useAppContext } from '../../context/AppContext';
import { Navigate, Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

interface Values {
  phone: string;
  password: string;
}

let initialState: Values = {
  phone: '',
  password: '',
};
export const Login = () => {
  let { loading, login, user, admin } = useAppContext();
  let { values, handleChange } = useForm(initialState);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(values);
  }

  if (user || admin) return <Navigate to="/" />;

  return (
    <div className="login full-page">
      <form className="form" onSubmit={handleSubmit}>
        <FormRow
          name="phone"
          type="text"
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

        <div className="form-footer">
          <button type="submit" disabled={loading}>
            {!loading ? 'إدخل' : 'loading'}
          </button>
          <span style={{ marginRight: '20px' }}>
            لو معملتش حساب قبل كدا سجل <Link to="/register">من هنا</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
