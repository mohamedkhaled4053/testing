import React from 'react';
import { Ivideo } from '../../../types/types';

type Props = {
  video: Ivideo | undefined;
};

export const DrivePlayer = ({ video }: Props) => {
  return (
    <>
      <div className="overlay drive"></div>
      <iframe
        title="drive video"
        src={video?.url}
        width="100%"
        height="100%"
        allow="autoplay"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </>
  );
};
