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
          <Link to="/derive-state-props">
            How to update state from props in React
          </Link>
        </li>
        <li>
          <Link to="/react-memo">How to use React memo</Link>
        </li>
        <li>
          <Link to="/usecallback-hook">How to useCallback in React</Link>
        </li>
        <li>
          <Link to="/usememo-hook">How to useMemo in React</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigator;
