import React from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({
    component: Component,
    isAuthenticated,
    path,
    ...rest
  }: any) => (isAuthenticated ? <Navigate to="/" /> : <Component {...rest} />);
  