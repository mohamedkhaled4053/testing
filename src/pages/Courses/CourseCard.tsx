import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ICourse } from '../../types/types';
import { scrollListenerAndCleanUp, showElement } from '../../utils/helper';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useSharedContext } from '../../context/SharedContext';

type Props = ICourse;

export const CourseCard = ({ _id, imageUrl, price, title }: Props) => {
  let { admin, api, user } = useAppContext();
  let { getCourses } = useSharedContext();
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
      await api.delete(`/admin/course/${_id}`, {
        headers: { Authorization: `bearer ${admin?.token}` },
      });
      getCourses();
      toast.success('تم الحذف');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div ref={cardRef} className="course-card hidden">
      {user?.courses.includes(_id) && <div className="sold">تم الشراء</div>}
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
        <p>{price} جنيه</p>
        <Link to={`/courses/${_id}`}>عرض المحتوى</Link>
        {admin && (
          <div className="admin-buttons">
            <Link to={`/admin/courses/${_id}`} className="edit">
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
