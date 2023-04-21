import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import UserProfile from '../../components/userprofile/UserProfile';
import UserBlogs from '../../components/userblogs/UserBlogs';
import { UserBlogContextProvider } from '../../contexts/UserBlogContext';

import "./Profile.css";

export default function Profile() {
  const { state } = useAuthContext();

  if (!state.user) {
    return (
      <Navigate to="/login" replace={true} />
    );
  }

  return (
    <>
      <UserProfile />
      <div className="box" id="blogsHead">Your Blogs</div>
      <UserBlogContextProvider>
        <UserBlogs />
      </UserBlogContextProvider>
    </>
  )
}
