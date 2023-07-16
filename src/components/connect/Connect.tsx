import { useEffect, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import './style.scss';
import { useLocation } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

export const Connect = () => {
  let [showMessage, setShowMessage] = useState(false);
  let [isIcon, setIsIcon] = useState(false);

  useEffect(() => {
    let timer = setInterval(() => {
      setIsIcon((prev) => !prev);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  let { pathname } = useLocation();
  if (pathname.includes('admin')) return null;

  return (
    <div className="connect">
      <div className={`message ${showMessage && 'show'}`}>
        <p>
          <AiOutlineClose onClick={() => setShowMessage(false)} />
        </p>
        <p>تواصل معنا على التليجرام</p>
        <a
          href="https://t.me/+201030720387"
          target="_blank"
          rel="noreferrer"
          className="num"
        >
          01030720387
        </a>
      </div>
      <div className="icon" onClick={() => setShowMessage(!showMessage)}>
        {showMessage ? <AiOutlineClose /> : isIcon ? <FaPhoneAlt /> : 'التواصل'}
      </div>
    </div>
  );
};
