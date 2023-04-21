import React from 'react'
import { Navigate } from 'react-router-dom';

import Signup from "../../components/signup/Signup";
import useAuthContext from '../../hooks/useAuthContext';

function SignUpForm() {
  const { state } = useAuthContext();

  if (state.user) {
    return (
      <Navigate to="/" replace={true} />
    );
  }

  return (
    <>
      <Signup />
    </>
  )
}

export default SignUpForm
