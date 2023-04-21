import React from 'react'
import { Navigate } from 'react-router-dom';

import Login from "../../components/login/Login";
import useAuthContext from '../../hooks/useAuthContext';

function LogInForm() {
  const { state } = useAuthContext();

  if (state.user) {
    return (
      <Navigate to="/" replace={true} />
    );
  }

  return (
    <>
      <Login />
    </>
  )
}

export default LogInForm
