import React from 'react';
import loadingImg from '../../assets/images/loading.svg';
import './style.scss';

type Props = {
  page?: boolean;
};

export const Loading = ({ page }: Props) => {
  return (
    <div className={`loading ${page ? 'full-page' : 'not-page'}`}>
      <img src={loadingImg} alt="loading" />
    </div>
  );
};
