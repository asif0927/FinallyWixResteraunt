import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation,Navigate } from 'react-router-dom';
import Navbar from '../../components/Admin/Navbar';
import Footer from '../../components/Admin/Footer';
import Login from './Login';

const AdminRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated && location.pathname !== '/admin') {
      navigate('/admin');
    }
  }, [navigate, location]);

  const isLoggedIn = !!localStorage.getItem('token');

  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }


  if (location.pathname === '/admin') {
    return <Login />;
  }

  return (
    <>
      {isLoggedIn && (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default AdminRoot;  