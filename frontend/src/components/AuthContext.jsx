import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log(token)
    setIsAuthenticated(!!token); 
  }, []);

  const login = () => {
      setIsAuthenticated(true); // No need to set cookies here, backend handles it
  };

  const logout = () => {
      Cookies.remove('token'); // Remove token from cookies
      setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
