import { useEffect } from 'react';
import plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { Ivideo } from '../../../types/types';

type Props = {
  video: Ivideo;
};

export const HtmlPlayer = ({ video }: Props) => {
  let setting: { options?: plyr.Options; source: plyr.SourceInfo } = {
    options: {
      controls: [
        'rewind',
        'play',
        'fast-forward',
        'progress',
        'current-time',
        'duration',
        // "mute",
        // "volume",
        'settings',
        'fullscreen',
      ],
      // clickToPlay:true
    },
    source: {
      type: 'video',
      sources: video.quality!.map((q) => {
        return {
          src: `https://${process.env.REACT_APP_CLOUD_FRONT}.cloudfront.net/${video.url}${q}.mp4`,
          type: 'video/mp4',
          size: q,
        };
      }),
    },
  };

  // [
  //   {
  //     src: 'https://dn2ye0xrcy1y5.cloudfront.net/quality/1080.mp4',
  //     type: 'video/mp4',
  //     size: 1080,
  //   },
  //   {
  //     src: 'https://dn2ye0xrcy1y5.cloudfront.net/quality/144.mp4',
  //     type: 'video/mp4',
  //     size: 240,
  //   },
  // ]

  useEffect(() => {
    let player = new plyr('.js-plyr', setting.options);
    player.source = setting.source;
    return () => {
      player.destroy();
    };
    //eslint-disable-next-line
  }, []);

  return <video className="js-plyr plyr"></video>;
};
