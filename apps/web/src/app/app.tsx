import './app.module.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import DashLayout from './components/dash-layout/dash-layout';
import Layout from './components/layout';
import Public from './components/public/public';
import Login from './features/auth/login';
import Welcome from './features/auth/welcome/welcome';
import NotesList from './features/notes/notes-list';
import UsersList from './features/users/users-list';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
