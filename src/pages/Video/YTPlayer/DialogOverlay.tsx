import React from 'react';
import Overlay from './Overlay';
import { useVideoContext } from '../../../context/VideoContext';

const DialogOverlay = () => {
  let { dialogRef } = useVideoContext();
  return (
    <dialog id="dialog" ref={dialogRef}>
      <Overlay />
    </dialog>
  );
};

export default DialogOverlay;
