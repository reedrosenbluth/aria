import React, { Component, PropTypes } from 'react';
import styles from './Library.css';

class Library extends Component {
  static propTypes = {
    playAlbum: PropTypes.func.isRequired,
    albums: PropTypes.func.isRequired
  };
  
  render() {
    const { playAlbum } = this.props;
    return (
      <div className={'container-fluid'}>
        <div className={'col-lg-9'}>
          {albums.map(function(album, i) {
            return <Album album={album} key={i}/> 
          })}
        </div>
      </div>
    );
  }
}
