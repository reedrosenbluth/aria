import React, { Component, PropTypes } from 'react';
import styles from './Library.css';
import Album from './Album';

export default class Library extends Component {
  static propTypes = {
    library: PropTypes.object.isRequired
  };

  render() {
    const { library } = this.props;
    return (
      <div className={'container-fluid'}>
        <div className={'col-lg-9'}>
          {library.albums.map(function(album, i) {
            return <Album album={album} key={i} />;
          })}
        </div>
      </div>
    );
  }
}
