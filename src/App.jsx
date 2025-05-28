import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import UsersRoutes from './routes/usersRoutes';
import ProductsRoutes from './routes/productsRoutes';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-container container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios/*" element={<UsersRoutes />} />
          <Route path="/productos/*" element={<ProductsRoutes />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
