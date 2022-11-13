import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

export const authContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async () => {
    const token = await authService.getFakeToken();
    setToken(token);
    const origin = location.state?.from || 'derived-from-props';
    navigate(origin);
  };
  const handleLogout = () => {
    setToken(null);
  };
  const value = {
    token,
    login: handleLogin,
    logout: handleLogout
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
