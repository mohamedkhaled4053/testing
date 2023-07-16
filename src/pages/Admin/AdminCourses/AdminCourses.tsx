import { FormEvent, useEffect, useState } from 'react';
import { FormRow } from '../../../components/form/FormRow';
import { FormRowSelect } from '../../../components/form/FormRowSelect';
import { studyLevels } from '../../../utils/constants';
import { ICourse, createCourseBody } from '../../../types/types';
import { FormRowFile } from '../../../components/form/FormRowFile';
import { toast } from 'react-toastify';
import { useForm } from '../../../hooks/useForm';
import { useAppContext } from '../../../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useSharedContext } from '../../../context/SharedContext';

let initialState: createCourseBody = {
  title: '',
  price: '',
  level: 'الصف الأول الثانوي',
  image: undefined,
  imageUrl: undefined,
};

export const AdminCourses = () => {
  let { api, admin } = useAppContext();
  let { getCourses } = useSharedContext();
  let { values, handleChange, setValues } = useForm(initialState);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { id: courseId } = useParams();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let path = values._id ? `/admin/course/${values._id}` : `/admin/course`;
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
      getCourses();
      if (values._id) navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!courseId) return;
    async function getCourse() {
      setLoading(true);
      try {
        let { data: course } = await api.get<ICourse>(
          `/admin/course/${courseId}`,
          {
            headers: { Authorization: `bearer ${admin?.token}` },
          },
        );
        let { title, imageUrl, level, price, _id } = course;
        setValues({
          ...values,
          _id,
          title,
          level,
          price: price.toString(),
          imageUrl,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCourse();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="add-course full-page">
      <form onSubmit={handleSubmit}>
        <FormRow
          name="title"
          type="text"
          labelText="عنوان الكورس"
          value={values.title}
          handleChange={handleChange}
        />
        <FormRow
          name="price"
          type="number"
          labelText="السعر"
          value={values.price}
          handleChange={handleChange}
        />
        <FormRowFile
          name="image"
          labelText="الصورة"
          imageUrl={values.imageUrl}
          handleChange={handleChange}
        />
        <FormRowSelect
          name="level"
          labelText="الصف الدراسي"
          value={values.level}
          list={studyLevels}
          handleChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'loading' : courseId ? 'تعديل' : 'إضافة'}
        </button>
      </form>
    </div>
  );
};
