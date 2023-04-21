import React from 'react'
import Update from '../../components/update/Update'
import useAuthContext from '../../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

function UpdateForm() {
  const { state } = useAuthContext();

  if (!state.user) {
    return (
      <Navigate to="/login" replace={true} />
    );
  }
  return (
    <>
      <Update />
    </>
  )
}

export default UpdateForm
