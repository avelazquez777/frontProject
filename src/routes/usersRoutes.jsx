import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UsersView from '../pages/users/usersView';
import UsersForm from '../pages/users/usersForm';

const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersView />} />
      <Route path="nuevo" element={<UsersForm />} />
      <Route path="editar/:id" element={<UsersForm />} />
    </Routes>
  );
};

export default UsersRoutes;
