import React, { createContext, useState, useEffect } from 'react';
import userService from '../services/usersService';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAll();
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
