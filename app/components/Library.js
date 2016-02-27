import React, { Component, PropTypes } from 'react';
import styles from './Library.css';
import Album from './Album';

class Library extends Component {
  componentDidMount() {
    dispatch(fetchDataIfNeeded())
  }

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

Library.propTypes = {
  library: PropTypes.object.isRequired
};

export default Library;