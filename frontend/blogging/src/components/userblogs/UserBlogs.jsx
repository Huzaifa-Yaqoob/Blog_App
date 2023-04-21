import React, { useEffect } from 'react'

import "./UserBlogs.css";
import useDeleteBlog from '../../hooks/useDeleteBlog';
import useUserBlogContext from '../../hooks/useUserBlogContext';
import dateConverter from '../../functions/dateConverter';

function UserBlogs() {
  const {state, dispatch} = useUserBlogContext();
  const  {deleteBlog, error, isLoading} = useDeleteBlog();
  useEffect(() => {
    const getBlogs = async () => {
      const data = await userBlogss();
      dispatch({type: "GET_DATA", payload: data});
    }
    getBlogs();
  },[dispatch]);
  const blogs = state.userBlog;

  const deleteClickHandler = async (e) => {
    await deleteBlog(e.target.value);
    const getBlogs = async () => {
      const data = await userBlogss();
      dispatch({type: "GET_DATA", payload: data});
    }
    if (!error) {
      getBlogs();
    }
  }
  if (blogs[0].blogs != null) {
    return (
      <>
      <div className='err box'>{error ? "Access Denied due to some error" : ""}</div>    
       {blogs.map(blog => (
          <article key={blog.blogs._id}>
           <div className='box articleBox'>
                <main>
                  <h2>{blog.blogs.title} :</h2>
                  <p>{blog.blogs.content}</p>
                </main>
               <div className='timeBox'>
                  <span><button value={blog.blogs._id} onClick={deleteClickHandler}  disabled={isLoading} >Delete</button></span>
                  <span>{dateConverter(blog.blogs.date)}</span>
                </div>
            </div>
          </article>  
        ))}
      </>
    )
  }else {
    return (
      <>
        <div className='box errorBox'>
          <h1>Nothing to show you here</h1>
        </div>
      </>
    )
  }
}

export default UserBlogs

const userBlogss = async () => {
  const user = localStorage.getItem("user");
  var userToken = "Wrong";
  if (user) {
    userToken = JSON.parse(user).token;
  }
  try {
    const response = await fetch('http://127.0.0.1:5000/blogs/getMine', {
      method: "GET",
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json"
            },
    });
    if (!response.ok) {
      return null;
    }
    const blogs = await response.json();
    return blogs;
  } catch (error) {
    return null;
  }
}