import React from 'react';
import ReactPlayer from 'react-player/lazy';
import styles from './video-player.module.scss';

const VideoPlayer = () => {
  return (
    <div className={styles.player__wrapper}>
      <ReactPlayer
        className={styles.video__player}
        width="100%"
        light="images/presentation.jpg"
        height="100%"
        playIcon={<div className={styles.play__button}></div>}
        url="https://www.youtube.com/watch?v=-4i6TK5dszw"
      />
    </div>
  );
};

export default VideoPlayer;
