import React from 'react';
import {
  BrowserRouter,
  Routes as ReactRoutes,
  Route,
} from 'react-router-dom';
import AuthProvider from '@contexts/auth/AuthProvider';
import { useLazy } from '@hooks/useLazy';
import HttpHandler from '../utils/request';

const CommonRoutes: React.FC = () => {
  const Home = useLazy(() => import('../pages/Home'));

  return (
    <BrowserRouter>
      <AuthProvider>
        <HttpHandler>
          <ReactRoutes>
            <Route path="/" element={<Home />} />
          </ReactRoutes>
        </HttpHandler>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default CommonRoutes;
