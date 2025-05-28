// src/hooks/useUsers.js
import { useState, useEffect, useCallback } from 'react';
import userService from '../services/usersService';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAll();
      console.log("DEBUG - Respuesta de users:", response.data.data);
      setUsers(response.data.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Error al cargar usuarios");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.create(data);
      const newUser = response.data.data;
      setUsers((prevUsers) => [...prevUsers, newUser]);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.update(id, data);
      const updatedUser = response.data.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) => 
          user.id === parseInt(id) ? updatedUser : user
        )
      );
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await userService.delete(id);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== parseInt(id))
      );
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUsers;
