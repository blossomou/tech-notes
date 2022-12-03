import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './dash-footer.module.css';

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onGoHomeClicked = () => navigate('/dash');

  let goHomeButton = null;
  if (pathname !== '/dash') {
    goHomeButton = (
      <button
        className={styles['dash-footer__button icon-button']}
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className={styles['dash-footer']}>
      {goHomeButton}
      <p>Current User: </p>
      <p>Status: </p>
    </footer>
  );
  return content;
};

export default DashFooter;
