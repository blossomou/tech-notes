import React from 'react';
import { Link } from 'react-router-dom';

import styles from './dash-header.module.css';

const DashHeader = () => {
  const content = (
    <header className={styles['dash-header']}>
      <div className={styles['dash-header__container']}>
        <Link to="/dash">
          <h1 className={styles['dash-header__title']}>techNotes</h1>
        </Link>
        <nav className={styles['dash-header__nav']}>
          {/* add nav buttons later */}
        </nav>
      </div>
    </header>
  );

  return content;
};

export default DashHeader;
