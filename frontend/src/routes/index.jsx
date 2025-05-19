import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Events from '../pages/Events';
import Clubs from '../pages/Clubs';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from '../pages/AdminDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute element={<Home />}/> },
      { path: 'events', element: <ProtectedRoute element={<Events />} /> },
      { path: 'clubs', element: <ProtectedRoute element={<Clubs />} /> },
      { path: 'login', element: <Login /> },
      { path: 'admindashboard', element: <AdminDashboard/> },
      { path: 'adminlogin', element: <AdminLogin/> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
