import { useState } from 'react';
import logo from '../../assets/images/logo.png';
import './style.scss';
import { Link } from 'react-router-dom';
import {
  HiUserCircle,
  HiUserAdd,
  HiOutlineLogin,
  HiOutlineLogout,
  HiMenu,
} from 'react-icons/hi';
import { useAppContext } from '../../context/AppContext';

type Props = {};

export const Navbar = (props: Props) => {
  let { user, admin, logout } = useAppContext();
  let [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="color-overlay"></div>
      <div className="navbar">
        <div className="container">
          <div className="brand">
            <Link to={'/'}>
              <img src={logo} alt="logo" className="logo" />
            </Link>
            <Link to={'/'}>الرئيسية</Link>
            {admin && <Link to={'/admin'}>الأدمن</Link>}
          </div>
          <div className="auth">
            {!user && !admin ? (
              <>
                <Link to={'/login'} className="button">
                  الدخول الى حسابك
                  <HiOutlineLogin />
                </Link>
                <Link to={'/register'} className="button">
                  انشاء حساب
                  <HiUserAdd />
                </Link>
              </>
            ) : (
              <>
                <HiUserCircle size={50} />
                <Link to={'/'} className="button" onClick={() => logout()}>
                  تسجيل الخروج
                  <HiOutlineLogout />
                </Link>
              </>
            )}
          </div>
          <div className="mobile">
            <HiMenu onClick={() => setShowMenu(!showMenu)} />
            <div className={`menu ${showMenu && 'show'}`}>
              {!user && !admin ? (
                <>
                  <Link to={'/login'} className="button">
                    الدخول الى حسابك
                    <HiOutlineLogin />
                  </Link>
                  <Link to={'/register'} className="button">
                    انشاء حساب
                    <HiUserAdd />
                  </Link>
                </>
              ) : (
                <>
                  <Link to={'/'} className="button" onClick={() => logout()}>
                    تسجيل الخروج
                    <HiOutlineLogout />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
