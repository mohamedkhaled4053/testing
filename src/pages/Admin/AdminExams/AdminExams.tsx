import { FormEvent, useEffect, useState } from 'react';
import { FormRow } from '../../../components/form/FormRow';
import { IExam, createExamBody } from '../../../types/types';
import { toast } from 'react-toastify';
import { useForm } from '../../../hooks/useForm';
import { useAppContext } from '../../../context/AppContext';
import { FormRowArray } from '../../../components/form/FormRowArray';
import { useSharedContext } from '../../../context/SharedContext';
import { useNavigate, useParams } from 'react-router-dom';

let initialState: createExamBody = {
  title: '',
  url: '',
  prevVid: undefined,
  // nextVid?: '',
  prevCourse: undefined,
};

export const AdminExams = () => {
  let { api, admin } = useAppContext();
  let { videos, courses } = useSharedContext();
  let [loading, setLoading] = useState(false);

  let { values, handleChange, setValues } = useForm(initialState);

  let navigate = useNavigate();
  let { id: ExamId } = useParams();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let path = values._id ? `/admin/exams/${values._id}` : `/admin/exams`;
    let method: 'post' | 'put' = values._id ? 'put' : 'post';
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
    if (!ExamId) return;
    async function getExam() {
      setLoading(true);
      try {
        let { data: video } = await api.get<IExam>(`/admin/exam/${ExamId}`, {
          headers: { Authorization: `bearer ${admin?.token}` },
        });
        let { title, formId, prevCourse, prevVid, _id } = video;
        setValues({
          ...values,
          _id,
          title,
          url: `https://docs.google.com/forms/d/${formId}/edit`,
          prevCourse,
          prevVid,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getExam();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="add-video full-page">
      <form onSubmit={handleSubmit}>
        <FormRow
          name="title"
          type="text"
          labelText="عنوان الامتحان"
          value={values.title}
          handleChange={handleChange}
        />
        <FormRow
          name="url"
          type="text"
          labelText="رابط الامتحان"
          value={values.url}
          handleChange={handleChange}
        />
        <FormRowArray
          name="prevVid"
          single
          labelText="الفيديو السابق"
          list={videos}
          defaultValue={values.prevVid}
          handleChange={(val) => setValues({ ...values, prevVid: val })}
        />
        {/* <FormRowArray
          name="prevCourse"
          single
          labelText="الكورس السابق"
          list={courses}
          defaultValue={values.prevCourse}
          handleChange={(val) => setValues({ ...values, prevCourse: val })}
        /> */}

        <button type="submit" disabled={loading}>
          {loading ? 'loading' : ExamId ? 'تعديل' : 'إضافة'}
        </button>
      </form>
    </div>
  );
};
