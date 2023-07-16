import React, {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import { useRef } from 'react';
import { useState } from 'react';
// import { useEffect } from 'react';
// import { findDOMNode } from 'react-dom';
// import screenfull from 'screenfull';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';

type Props = {
  children: ReactNode;
};

interface Context {
  playerState: PlayerState;
  openRates: boolean;
  playerRef: React.RefObject<ReactPlayer>;
  dialogRef: React.RefObject<HTMLDialogElement>;
  setOpenRates: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlayPause: () => void;
  handleSetPlaybackRate: (e: MouseEvent<HTMLButtonElement>) => void;
  handleOnPlaybackRateChange: (speed: any) => void;
  handlePlay: () => void;
  handlePause: () => void;
  handleSeekMouseDown: () => void;
  handleSeekChange: (
    e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>,
  ) => void;
  handleSeekMouseUp: (
    e: MouseEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>,
  ) => void;
  handleProgress: (state: OnProgressProps) => void;
  handleEnded: () => void;
  handleDuration: (duration: number) => void;
  // handleClickFullscreen: () => Promise<void>;
}

interface PlayerState {
  playing: boolean;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  seeking: boolean;
}

const VideoContext = createContext<Context | null>(null);
export const VideoProvider = ({ children }: Props) => {
  let [playerState, setPlayerState] = useState<PlayerState>({
    playing: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1,
    seeking: false,
  });

  let [openRates, setOpenRates] = useState(false);

  let playerRef = useRef<ReactPlayer>(null);
  let dialogRef = useRef<HTMLDialogElement>(null);

  const handlePlayPause = () => {
    setPlayerState({ ...playerState, playing: !playerState.playing });
  };

  const handleSetPlaybackRate = (e: MouseEvent<HTMLButtonElement>) => {
    setPlayerState({
      ...playerState,
      playbackRate: parseFloat(e.currentTarget.value),
    });
  };

  const handleOnPlaybackRateChange = (speed: any) => {
    setPlayerState({ ...playerState, playbackRate: parseFloat(speed) });
  };

  const handlePlay = () => {
    console.log('onPlay');
    setPlayerState({ ...playerState, playing: true });
  };

  const handlePause = () => {
    console.log('onPause');
    setPlayerState({ ...playerState, playing: false });
  };

  const handleSeekMouseDown = () => {
    setPlayerState({ ...playerState, seeking: true });
  };

  const handleSeekChange = (
    e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(parseFloat(e.currentTarget.value));
    setPlayerState({
      ...playerState,
      played: parseFloat(e.currentTarget.value),
    });
  };

  const handleSeekMouseUp = (
    e: MouseEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    if (!playerRef.current) return;
    setPlayerState({ ...playerState, seeking: false });
    playerRef.current.seekTo(parseFloat(e.currentTarget.value));
  };

  const handleProgress = (state: OnProgressProps) => {
    console.log('onProgress', state);
    // We only want to update time slider if we are not currently seeking
    if (!playerState.seeking) {
      setPlayerState((prevState) => {
        return {
          ...prevState,
          loaded: state.loaded,
          played: state.played,
        };
      });
    }
  };

  const handleEnded = () => {
    console.log('onEnded');
    setPlayerState({ ...playerState, playing: false });
  };

  const handleDuration = (duration: number) => {
    console.log('onDuration', duration);
    setPlayerState({ ...playerState, duration });
  };

  // const handleClickFullscreen = async () => {
  //   if (!screenfull.isFullscreen) {
  //     screenfull.request(findDOMNode(playerRef.current) as Element);
  //   } else {
  //     screenfull.exit();
  //   }
  // };

  // useEffect(() => {
  //   const handleChangeFullScreen = () => {
  //     if (!dialogRef.current) return;
  //     if (screenfull.isFullscreen) {
  //       dialogRef.current.showModal();
  //     } else {
  //       dialogRef.current.close();
  //     }
  //   };
  //   screenfull.on('change', handleChangeFullScreen);
  //   return () => {
  //     screenfull.off('change', handleChangeFullScreen);
  //   };
  // }, []);
  return (
    <VideoContext.Provider
      value={{
        playerState,
        openRates,
        playerRef,
        dialogRef,
        setOpenRates,
        handlePlayPause,
        handleSetPlaybackRate,
        handleOnPlaybackRateChange,
        handlePlay,
        handlePause,
        handleSeekMouseDown,
        handleSeekChange,
        handleSeekMouseUp,
        handleProgress,
        handleEnded,
        handleDuration,
        // handleClickFullscreen,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
// make sure use
export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context)
    throw new Error(
      'VideoContext must be called from within the VideoPorvider',
    );
  return context;
};
