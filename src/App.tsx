import { Route, Routes } from 'react-router-dom';
import {
  Admin,
  AdminCourses,
  AdminVideos,
  Admins,
  Courses,
  Error,
  Landing,
  Video,
  Videos,
  Login,
  AdminExams,
  Register,
  Users,
} from './pages';
import { Navbar } from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from './pages/User/User';
import { AdminForm } from './pages/Admin/Admins/AdminForm';
import { Connect } from './components/connect/Connect';
import { Footer } from './components/Footer/Footer';

export function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<Videos />} />
        <Route path="/videos/:id" element={<Video />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Users />} />
          <Route path="users/:id" element={<User />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/:id" element={<AdminCourses />} />
          <Route path="videos" element={<AdminVideos />} />
          <Route path="videos/:id" element={<AdminVideos />} />
          <Route path="exams" element={<AdminExams />} />
          <Route path="admins" element={<Admins />} />
          <Route path="admin-form" element={<AdminForm />} />
          <Route path="admin-form/:id" element={<AdminForm />} />
        </Route>
        <Route path="/*" element={<Error />} />
      </Routes>
      <Connect />
      <Footer />
      <ToastContainer position="bottom-left" rtl pauseOnFocusLoss={false} />
      <div>hello</div>
    </>
  );
}
