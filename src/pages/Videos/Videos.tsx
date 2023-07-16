import { useParams } from 'react-router-dom';
import { useSharedContext } from '../../context/SharedContext';
import './style.scss';
import { VideoCard } from './VideoCard';
import { Loading } from '../../components/Loading/Loading';

export const Videos = () => {
  let { videos, videosLoading: loading } = useSharedContext();

  let { id: courseId } = useParams();

  let filteredVideos = videos.filter(
    (video) =>
      video.courses.findIndex((course) => course._id === courseId) >= 0,
  );

  if (loading) return <Loading page />;

  if (filteredVideos.length === 0)
    return <div className="full-page">لا يوجد فيديوهات بعد</div>;

  return (
    <div className="full-page">
      <div className="container">
        <div className="courses">
          {filteredVideos.map((video) => (
            <VideoCard key={video._id} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
};
