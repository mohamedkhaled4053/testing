import { MdForward10, MdFullscreen, MdReplay10 } from 'react-icons/md';
import { AiOutlinePause } from 'react-icons/ai';
import { BsPlay } from 'react-icons/bs';
import { Duration } from './Duration';
import { useVideoContext } from '../../../context/VideoContext';

const Overlay = () => {
  let {
    playerState,
    handleClickFullscreen,
    handlePlayPause,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleSetPlaybackRate,
    openRates,
    setOpenRates,
  } = useVideoContext();

  let { playing, playbackRate, played, duration, loaded } = playerState;

  return (
    <div className="overlay">
      <div className="controls">
        <div className="backwork control">
          <button
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onClick={handleSeekChange}
            value={played - 10 / duration}
          >
            <MdReplay10 />
          </button>
        </div>

        <div className="play-pause control">
          <button onClick={handlePlayPause}>
            {playing ? <AiOutlinePause /> : <BsPlay />}
          </button>
        </div>

        <div className="forward control">
          <button
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onClick={handleSeekChange}
            value={played + 10 / duration}
          >
            <MdForward10 />
          </button>
        </div>

        <div className="track control">
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
          <progress max={1} value={loaded} />
        </div>

        <div className="time control">
          <Duration seconds={duration * played} /> /
          <Duration seconds={duration} />
        </div>

        <div className="rate control" onClick={() => setOpenRates(!openRates)}>
          {'x' + playbackRate}
          {openRates && (
            <div className="rates">
              {[1, 1.25, 1.5, 1.75, 2].map((rate) => (
                <button key={rate} value={rate} onClick={handleSetPlaybackRate}>
                  {rate}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="full-screen control">
          <button onClick={handleClickFullscreen}>
            <MdFullscreen />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
