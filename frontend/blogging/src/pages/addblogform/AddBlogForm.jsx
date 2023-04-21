import React from 'react'
import { Navigate } from 'react-router-dom';


import useAuthContext from '../../hooks/useAuthContext'
import AddBlog from '../../components/addblog/AddBlog';

function AddBlogForm() {
  const { state } = useAuthContext();

  if (!state.user) {
    return (
      <Navigate to="/login" replace={true} />
    );
  }

  return (
    <>
      <AddBlog />
    </>
  );
}

export default AddBlogForm
