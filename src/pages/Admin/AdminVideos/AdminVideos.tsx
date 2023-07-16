import { FormEvent, useEffect, useState } from 'react';
import { FormRow } from '../../../components/form/FormRow';
import { Ivideo, createVideoBody } from '../../../types/types';
import { FormRowFile } from '../../../components/form/FormRowFile';
import { toast } from 'react-toastify';
import { useForm } from '../../../hooks/useForm';
import { useAppContext } from '../../../context/AppContext';
import { FormRowArray } from '../../../components/form/FormRowArray';
import { useSharedContext } from '../../../context/SharedContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FormRowSelect } from '../../../components/form/FormRowSelect';
import { studyLevels } from '../../../utils/constants';

let initialState: createVideoBody = {
  title: '',
  url: '',
  courses: [],
  image: undefined,
  imageUrl: undefined,
  quality: '',
};

export const AdminVideos = () => {
  let { api, admin } = useAppContext();
  let { courses, getVideos } = useSharedContext();
  let [loading, setLoading] = useState(false);
  let [level, setLevel] = useState<string>('الصف الأول الثانوي');

  let { values, handleChange, setValues } = useForm(initialState);

  let navigate = useNavigate();
  let { id: videoId } = useParams();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let path = values._id ? `/admin/video/${values._id}` : `/admin/video`;
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
      getVideos();
      if (values._id) navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!videoId) return;
    async function getVideo() {
      setLoading(true);
      try {
        let {
          data: { video },
        } = await api.get<{ video: Ivideo }>(`/admin/video/${videoId}`, {
          headers: { Authorization: `bearer ${admin?.token}` },
        });
        let { title, imageUrl, courses, url, quality, _id } = video;
        setValues({
          ...values,
          _id,
          title,
          courses: courses.map((course) => course._id),
          url,
          imageUrl,
          quality: quality?.join(','),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getVideo();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="add-video full-page">
      <form onSubmit={handleSubmit}>
        <FormRow
          name="title"
          type="text"
          labelText="عنوان الفيديو"
          value={values.title}
          handleChange={handleChange}
        />
        <FormRow
          name="url"
          type="text"
          labelText="رابط الفيديو"
          value={values.url}
          handleChange={handleChange}
        />
        <FormRow
          name="quality"
          type="text"
          labelText="الجودات (s3)"
          value={values.quality || ''}
          disabled={values.url.includes('http') || values.url.length === 0}
          handleChange={handleChange}
        />
        <FormRowFile
          name="image"
          labelText="الصورة"
          handleChange={handleChange}
          imageUrl={values.imageUrl}
        />
        <FormRowSelect
          name="level"
          labelText="الصف"
          list={studyLevels}
          value={level}
          handleChange={(e) => setLevel(e.target.value)}
        />
        <FormRowArray
          name="courses"
          labelText="الكورسات"
          list={courses.filter((course) => course.level === level)}
          defaultValue={values.courses}
          handleChange={(val) => setValues({ ...values, courses: val })}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'loading' : videoId ? 'تعديل' : 'إضافة'}
        </button>
      </form>
    </div>
  );
};
