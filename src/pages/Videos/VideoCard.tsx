import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ivideo } from '../../types/types';
import { scrollListenerAndCleanUp, showElement } from '../../utils/helper';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useSharedContext } from '../../context/SharedContext';

type Props = Ivideo;

export const VideoCard = ({ _id, imageUrl, title }: Props) => {
  let { admin, api } = useAppContext();
  let { getVideos } = useSharedContext();
  let cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function showCard() {
      setTimeout(() => {
        showElement(cardRef.current!);
      }, 300);
    }

    showCard();
    return scrollListenerAndCleanUp(showCard);
  }, []);

  async function deleteCourse() {
    try {
      await api.delete(`/admin/video/${_id}`, {
        headers: { Authorization: `bearer ${admin?.token}` },
      });
      getVideos();
      toast.success('تم الحذف');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div ref={cardRef} className="course-card hidden" key={_id}>
      <img
        src={
          imageUrl.includes('http')
            ? imageUrl
            : `${process.env.REACT_APP_API_URL}${imageUrl}`
        }
        alt="course"
      />
      <div className="text">
        <h3>{title}</h3>
        {/* <div className='content'>{content.map(tag=><span>{tag}</span>)}</div> */}
        <Link to={`/videos/${_id}`}>عرض الفيديو</Link>
        {admin && (
          <div className="admin-buttons">
            <Link to={`/admin/videos/${_id}`} className="edit">
              تعديل
            </Link>
            <button onClick={deleteCourse} className="delete">
              حذف
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
