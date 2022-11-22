import React from 'react';
import ReactPlayer from 'react-player/lazy';
import styles from './video-player.module.scss';

const VideoPlayer = () => {
  return (
    <div className={styles.player__wrapper}>
      <ReactPlayer
        className={styles.video__player}
        controls={true}
        width="100%"
        light="images/presentation.jpg"
        height="100%"
        playIcon={<div className={styles.play__button}></div>}
        muted={true}
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
      />
    </div>
  );
};

export default VideoPlayer;
