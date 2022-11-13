import React from 'react';
import { authContext } from '../providers/AuthProvider';

export default function useAuth() {
  return React.useContext(authContext);
}
