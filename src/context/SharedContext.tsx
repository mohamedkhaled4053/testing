import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ICourse, Ivideo } from '../types/types';
import { useAppContext } from './AppContext';

type Props = {
  children: ReactNode;
};

interface Context {
  courses: ICourse[];
  videos: Ivideo[];
  coursesLoading: boolean;
  videosLoading: boolean;
  getCourses: () => void;
  getVideos: () => void;
}

export const SharedContext = createContext<Context | null>(null);
export const SharedPorvider = ({ children }: Props) => {
  let { api } = useAppContext();
  let [courses, setCourses] = useState<ICourse[]>([]);
  let [videos, setVideos] = useState<Ivideo[]>([]);
  let [coursesLoading, setCoursesLoading] = useState(false);
  let [videosLoading, setVideosLoading] = useState(false);

  async function getCourses() {
    setCoursesLoading(true);
    api
      .get('/shared/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err))
      .finally(() => setCoursesLoading(false));
  }

  async function getVideos() {
    setVideosLoading(true);
    api
      .get('/shared/videos')
      .then((res) => setVideos(res.data))
      .catch((err) => console.log(err))
      .finally(() => setVideosLoading(false));
  }

  useEffect(() => {
    getCourses();
    getVideos();
    //eslint-disable-next-line
  }, []);

  return (
    <SharedContext.Provider
      value={{
        courses,
        videos,
        coursesLoading,
        videosLoading,
        getCourses,
        getVideos,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
};
// make sure use
export const useSharedContext = () => {
  const context = useContext(SharedContext);

  if (!context)
    throw new Error('UserContex must be called from within the userProvider');

  return context;
};
