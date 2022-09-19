import React, {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import {
  ROLES, resetLocalAuth, getLocalAuth, setLocalAuth,
} from '@utils/auth';
import { logoutSession } from '@utils';
import { ISetAuth } from '@entities';
import { AuthContext } from './auth';
import { IAuthProvider } from './types';

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [id, setId] = useState(getLocalAuth().id);
  const [role, setRole] = useState(getLocalAuth().role || ROLES.GUEST);

  const setAuth: ISetAuth = (id, role, access_token, refresh_token) => {
    setId(id);
    setRole(role);
    setLocalAuth(id, role, access_token, refresh_token);
  };

  useEffect(() => {
    const authListener = () => {
      const {
        role: localRole, id: localId, access_token, refresh_token,
      } = getLocalAuth();

      if (role !== localRole || id !== localId) {
        console.warn('storage changed AUTH PROVIDER', getLocalAuth());
        setAuth(localId, localRole, access_token, refresh_token);
      }
    };

    window.addEventListener('storage', authListener);

    return () => window.removeEventListener('storage', authListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    const logout = logoutSession(id);

    logout.then(() => {
      setAuth(null, ROLES.GUEST, '', '');
      resetLocalAuth();
    });
  }, [id]);

  const AuthConfig = useMemo(() => ({
    id,
    role,
    setAuth,
    getLocalAuth,
    logout,
    ROLES,
    resetLocalAuth,
  }), [id, role, logout]);

  return (
    <AuthContext.Provider value={AuthConfig}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
