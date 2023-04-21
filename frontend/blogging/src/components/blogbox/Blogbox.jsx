import React from 'react'
import { useLoaderData } from 'react-router-dom';
import dateConverter from '../../functions/dateConverter';
// custom components and files
import "./Blogbox.css";

function Blogbox() {
  const blogs = useLoaderData();

  if (blogs === null) {
    return (
      <>
        <div className='box errorBox'>
          <h1>Nothing to show you here</h1>
        </div>
      </>
    )
  }else {
    return (
      <>    
       {blogs.map(blog => (
          <article key={blog._id}>
           <div className='box articleBox'>
                <main>
                  <h2>{blog.title} :</h2>
                  <p>{blog.content}</p>
                </main>
               <div className='timeBox'>
                  <span>{blog.user_blog.name}</span>
                  <span>{dateConverter(blog.date)}</span>
                </div>
            </div>
          </article>  
        ))}
      </>
    )
  }
}

export const blogsLoader = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/blogs/getAll');
    if (!response.ok) {
      return null;
    }
    const blogs = await response.json(); 
    return blogs;
  } catch (error) {
    return null;
  }
}

export default Blogbox;
