import React from 'react';
import { Outlet } from 'react-router-dom';

import DashFooter from '../dash-footer/dash-footer';
import DashHeader from '../dash-header/dash-header';
import styles from './dash-layout.module.css';

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className={styles['dash-container']}>
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;
