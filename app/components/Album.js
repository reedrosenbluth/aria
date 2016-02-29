import React, { Component, PropTypes } from 'react';
import styles from './Album.css';

export default class Album extends Component {
  static propTypes = {
    album: PropTypes.object.isRequired
  };

  render() {
    const { album } = this.props;
    return (
      <div className={styles.album + ' col-lg-2 col-md-3 col-sm-3'}>
        <img src={album.img} />
      </div>
    );
  }
}
