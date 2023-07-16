import React from 'react';
import {
  FaFacebookF,
  FaPhoneAlt,
  FaTelegramPlane,
  FaYoutube,
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './style.scss';

export const Footer = () => {
  let { pathname } = useLocation();
  if (pathname.includes('admin')) return null;

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="phone">
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
        <div className="links">
          <p>روابط التواصل</p>
          <div className="icons">
            <a
              href="https://www.facebook.com/MohamedFathyPyhsics?mibextid=ZbWKwL"
              target="_blank"
              rel="noreferrer"
              className="facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.youtube.com/@mohamed_fathy"
              target="_blank"
              rel="noreferrer"
              className="youtube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://t.me/+201030720387"
              target="_blank"
              rel="noreferrer"
              className="telegram"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="tel:+201030720387"
              target="_blank"
              rel="noreferrer"
              className="phone"
            >
              <FaPhoneAlt />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
