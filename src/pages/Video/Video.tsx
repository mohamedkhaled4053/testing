import { useState, useEffect } from 'react';
import { IExam, Ivideo } from '../../types/types';
import { useAppContext } from '../../context/AppContext';
import { Navigate, useParams } from 'react-router';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useSharedContext } from '../../context/SharedContext';
import './style.scss';
import { YTPlayer } from './YTPlayer/YTPlayer';
import { DrivePlayer } from './DrivePlayer/DrivePlayer';
import { HtmlPlayer } from './HtmlPlayer/HtmlPlayer';
import { Loading } from '../../components/Loading/Loading';

export const Video = () => {
  let { api, user, admin } = useAppContext();
  let { videos } = useSharedContext();

  let [video, setVideo] = useState<Ivideo>();
  let [exam, setExam] = useState<IExam>();
  let [haveAccess, setHaveAccess] = useState(true);
  let [loading, setLoading] = useState(true);

  let { id: videoId } = useParams();

  async function getVideo() {
    if (!user && !admin) return;
    let path = `user/videos/${videoId}`;
    let token = user?.token;
    if (admin) {
      path = `admin/video/${videoId}`;
      token = admin.token;
    }
    setLoading(true);
    try {
      let { video, exam } = await api
        .get(path, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((res) => res.data);
      setVideo(video);
      setExam(exam);
    } catch (error) {
      console.log(error);
      if ((error as AxiosError).response?.status === 403) setHaveAccess(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getVideo();
    //eslint-disable-next-line
  }, []);

  if (!user && !admin) {
    toast.info('يجب ان تسجل الدخول اولا');
    return <Navigate to={'/login'} />;
  }

  if (loading) return <Loading page />;

  if (!haveAccess) {
    let video = videos.find((video) => video._id === videoId);
    return (
      <div className="no-access full-page">
        <h1>
          للوصول لهذا الفيديو يجب عليك التواصل معنا على الرقم الموضح أسفل الصفحة
          لتفعيل احد الشهور الاتية
        </h1>
        <div>
          {video?.courses.map((course) => (
            <h2>{course.title}</h2>
          ))}
        </div>
      </div>
    );
  }

  if (!video) return <div className="full-page">لا وجود لهذا الفيديو</div>;

  return (
    <div className="video-wrapper">
      <div className="video">
        {/google/.test(video.url) ? (
          <DrivePlayer video={video} />
        ) : /youtube|vimeo|youtu\.be/.test(video.url) ? (
          <YTPlayer video={video} />
        ) : (
          <HtmlPlayer video={video} />
        )}
      </div>
      {exam && (
        <a
          className="exam-link"
          target="_blank"
          rel="noreferrer"
          href={`https://docs.google.com/forms/d/${exam?.formId}/viewform`}
        >
          {exam.title}
        </a>
      )}
    </div>
  );
};
