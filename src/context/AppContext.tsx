import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { CustomError, LoggedAdmin, LoggedUser } from '../types/types';
import { toast } from 'react-toastify';
import { loginBody, signupBody } from '../types/types';
import { useNavigate } from 'react-router-dom';
import {
  addToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from '../utils/helper';
import axios, { AxiosError, AxiosInstance } from 'axios';

type Props = {
  children: ReactNode;
};

interface Context {
  api: AxiosInstance;
  user: LoggedUser | null;
  admin: LoggedAdmin | null;
  loading: boolean;
  signup: (signupData: signupBody) => void;
  login: (loginData: loginBody) => void;
  logout: () => void;
}

export const AppContext = createContext<Context | null>(null);
export const AppProvider = ({ children }: Props) => {
  let [user, setUser] = useState<LoggedUser | null>(
    getFromLocalStorage('user') as LoggedUser | null,
  );
  let [admin, setAdmin] = useState<LoggedAdmin | null>(
    getFromLocalStorage('admin') as LoggedAdmin | null,
  );
  let [loading, setLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  api.interceptors.response.use(
    (res) => res,
    (err: AxiosError<CustomError>) => {
      if (!err.isAxiosError) return Promise.reject(err);
      if (!err.response) {
        toast.error(err.message);
        return Promise.reject(err);
      }

      if (err.response.status === 422) {
        err.response.data.data?.map((validation: any) =>
          toast.error(validation),
        );
        return Promise.reject(err);
      }

      if (err.response.status === 401) {
        logout();
        navigate('/login');
      }

      if (err.response.status === 403) {
        let message = err.response.data.message;
        if (message !== '') toast.error(message);
        return Promise.reject(err);
      }

      if (err.response.data.message === 'jwt expired') {
        toast.error('يرجى تسجيل الدخول');
        logout();
        navigate('/login');
        return Promise.reject(err);
      }

      toast.error(err.response.data.message);
      return Promise.reject(err);
    },
  );

  const getDevice = useCallback(() => {
    let height = window.screen.height;
    let width = window.screen.width;
    if (width > height) {
      [height, width] = [width, height];
    }
    let screen = `${height} x ${width}`;

    return {
      //@ts-ignore
      memory: navigator.deviceMemory,
      cpu: navigator.hardwareConcurrency,
      screen,
    };
  }, []);

  async function signup(signupData: signupBody) {
    setLoading(true);
    try {
      let { user, message } = await api
        .post('/auth/signup', { ...signupData, device: getDevice() })
        .then((res) => res.data);
      console.log();

      // navigate('/login');
      setUser(user as LoggedUser);
      addToLocalStorage('user', user);
      toast.success(message, { autoClose: 15000 });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function login(loginData: loginBody) {
    const isAdmin = loginData.phone.includes('@');
    let path = '/auth/login';
    if (isAdmin) path = '/auth/admin-login';
    setLoading(true);
    try {
      let person = await api
        .post<LoggedUser | LoggedAdmin>(
          path,
          isAdmin ? loginData : { ...loginData, device: getDevice() },
        )
        .then((res) => res.data);
      if (isAdmin) {
        setAdmin(person as LoggedAdmin);
        addToLocalStorage('admin', person);
      } else {
        setUser(person as LoggedUser);
        addToLocalStorage('user', person);
      }
      toast.success(`أهلا بك ${person.name}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setUser(null);
    setAdmin(null);
    removeFromLocalStorage('user');
    removeFromLocalStorage('admin');
  }

  return (
    <AppContext.Provider
      value={{ api, user, admin, loading, signup, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error('UserContex must be called from within the userProvider');

  return context;
};
