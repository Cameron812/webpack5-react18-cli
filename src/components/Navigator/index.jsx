import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const Navigator = () => {
  const { token, logout } = useAuth();
  return (
    <div>
      {token && (
        <button type="button" onClick={logout}>
          Sign Out
        </button>
      )}
      <ul>
        {!token && (
          <li>
            <Link to="/home">Home</Link>
          </li>
        )}
        <li>
          <Link to="/derived-from-props">Derive From Pros</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigator;
