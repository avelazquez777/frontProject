import React from 'react';
import { Link } from 'react-router-dom';
import useUsers from '../../hooks/useUsers';
import '../../styles/usersView.css';

const UsersView = () => {
  const { users, loading, error, deleteUser } = useUsers();

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await deleteUser(id);
      } catch (err) {
        console.error('Error al eliminar usuario:', err);
      }
    }
  };

  if (loading) return <div className="users-view p-d-flex p-jc-center p-ai-center"><p className="loading-text">Cargando usuarios...</p></div>;
  if (error) return <div className="users-view p-d-flex p-jc-center p-ai-center"><p className="error-text">Error: {error}</p></div>;

  return (
    <div className="users-view p-d-flex p-jc-center p-ai-center">
      <div className="users-container">
        <h2>Lista de Usuarios</h2>
        <div className="p-text-center p-mb-4">
          <Link
            to="/usuarios/nuevo"
            className="add-user-btn"
          >
            ✨ Agregar Usuario
          </Link>
        </div>
        {users.length === 0 ? (
          <p className="empty-text">No hay usuarios disponibles.</p>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>{user.edad}</td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/usuarios/editar/${user.id}`}
                        className="btn-edit"
                      >
                        ✏️ Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn-delete"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsersView;