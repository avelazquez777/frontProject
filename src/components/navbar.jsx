import React from 'react';
import { Link } from 'react-router-dom';
import '..//styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar p-d-flex p-ai-center p-jc-between">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand">
          Inicio
        </Link>
        <div className="navbar-links">
          <Link to="/usuarios" className="navbar-link">
            Usuarios
          </Link>
          <Link to="/productos" className="navbar-link">
            Productos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
