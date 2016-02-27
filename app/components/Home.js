import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

import LibraryPage from '../containers/LibraryPage';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <div><h2>Aria</h2></div>
          <LibraryPage />
        </div>
      </div>
    );
  }
}
