import React, { Component, PropTypes } from 'react';
import styles from './Album.css';

export default class Album extends Component {
  static propTypes = {
    album: PropTypes.string.isRequired
  };

  render() {
    const { album } = this.props;
    return (
      <div className={'album'}>
        {album}
      </div>
    );
  }
}
