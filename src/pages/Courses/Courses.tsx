import { useLocation, Link } from 'react-router-dom';
import { studyLevels } from '../../utils/constants';
import { useSharedContext } from '../../context/SharedContext';
import './style.scss';
import { CourseCard } from './CourseCard';
import { useAppContext } from '../../context/AppContext';
import { ICourse } from '../../types/types';
import { Loading } from '../../components/Loading/Loading';

export const Courses = () => {
  let { courses, coursesLoading: loading } = useSharedContext();
  let { user } = useAppContext();

  let { search } = useLocation();
  let query = new URLSearchParams(search);

  let level = query.get('level');
  let mine = query.get('mine');

  if (!level && !mine)
    return (
      <div className="container full-page">
        <div className="courses">
          {studyLevels.map((level) => (
            <Link key={level} to={`/courses?level=${level}`}>
              {level}
            </Link>
          ))}
        </div>
      </div>
    );

  let filteredCourses: ICourse[];

  if (mine) {
    filteredCourses = courses.filter((course) =>
      user?.courses.includes(course._id),
    );
  } else {
    filteredCourses = courses.filter((course) => course.level === level);
  }

  if (loading) return <Loading page />;

  if (filteredCourses.length === 0)
    return <div className="full-page">لا يوجد كورسات بعد</div>;

  return (
    <div className="full-page">
      <div className="container">
        <div className="courses">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};
