import { FormEvent, useEffect, useState } from 'react';
import { FormRow } from '../../../components/form/FormRow';
import { FormRowSelect } from '../../../components/form/FormRowSelect';
import { IAdmin, createAdminBody } from '../../../types/types';
import { toast } from 'react-toastify';
import { useForm } from '../../../hooks/useForm';
import { useAppContext } from '../../../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

let initialState: createAdminBody = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  type: 'secondary',
};

export const AdminForm = () => {
  let { api, admin } = useAppContext();
  let { values, handleChange, setValues } = useForm(initialState);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { id: adminId } = useParams();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let path = values._id ? `/admin/admin/${values._id}` : `/admin/admins`;
    let method: 'postForm' | 'putForm' = values._id ? 'putForm' : 'postForm';
    setLoading(true);
    try {
      let {
        data: { message },
      } = await api[method](path, values, {
        headers: { Authorization: `bearer ${admin?.token}` },
      });
      toast.success(message);
      setValues(initialState);
      if (values._id) navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!adminId) return;
    async function getAdmin() {
      setLoading(true);
      try {
        let { data: AdminData } = await api.get<IAdmin>(
          `/admin/admin/${adminId}`,
          {
            headers: { Authorization: `bearer ${admin?.token}` },
          },
        );
        let { name, email, type, _id } = AdminData;
        setValues({
          ...values,
          _id,
          name,
          email,
          type: type as 'main' | 'secondary',
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAdmin();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="add-admin full-page">
      <form onSubmit={handleSubmit}>
        <FormRow
          name="name"
          type="text"
          labelText="name"
          value={values.name}
          handleChange={handleChange}
        />
        <FormRow
          name="email"
          type="email"
          labelText="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          name="password"
          type="password"
          labelText="password"
          value={values.password}
          handleChange={handleChange}
        />
        <FormRow
          name="confirmPassword"
          type="password"
          labelText="confirm password"
          value={values.confirmPassword}
          handleChange={handleChange}
        />
        <FormRowSelect
          name="type"
          labelText="type"
          value={values.type}
          list={['main', 'secondary']}
          handleChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'loading' : adminId ? 'تعديل' : 'إضافة'}
        </button>
      </form>
    </div>
  );
};
