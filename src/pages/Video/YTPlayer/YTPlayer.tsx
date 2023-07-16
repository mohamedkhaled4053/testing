import { Ivideo } from '../../../types/types';
import '../style.scss';
import ReactPlayer from 'react-player';
// import { useVideoContext } from '../../../context/VideoContext';
// import Overlay from './Overlay';
// import DialogOverlay from './DialogOverlay';

type Props = {
  video: Ivideo | undefined;
};

export const YTPlayer = ({ video }: Props) => {
  // let {
  //   playerState,
  //   playerRef,
  //   handlePlay,
  //   handlePause,
  //   handleOnPlaybackRateChange,
  //   handleEnded,
  //   handleProgress,
  //   handleDuration,
  // } = useVideoContext();

  // let { playing, playbackRate } = playerState;
  return (
    <>
      {/* <Overlay />
      <DialogOverlay /> */}
      <ReactPlayer
        // ref={playerRef}
        className="react-player"
        width="100%"
        height="100%"
        url={video?.url}
        volume={1}
        controls
        // playing={playing}
        // playbackRate={playbackRate}
        // onReady={() => console.log('onReady')}
        // onStart={() => console.log('onStart')}
        // onPlay={handlePlay}
        // onPause={handlePause}
        // onBuffer={() => console.log('onBuffer')}
        // onPlaybackRateChange={handleOnPlaybackRateChange}
        // onSeek={(e) => console.log('onSeek', e)}
        // onEnded={handleEnded}
        // onError={(e) => console.log('onError', e)}
        // onProgress={handleProgress}
        // onDuration={handleDuration}
      />
    </>
  );
};
