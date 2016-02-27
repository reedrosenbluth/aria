import React, { Component, PropTypes } from 'react';
import styles from './Library.css';

export default class Library extends Component {
  static propTypes = {
    albums: PropTypes.object.isRequired
  };
  
  render() {
    const { albums } = this.props;
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
