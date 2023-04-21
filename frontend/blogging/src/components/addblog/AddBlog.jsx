import React from 'react'
import { useState } from 'react';
import { Form } from 'react-router-dom';

import useAddBlog from '../../hooks/useAddBlog';
import "./AddBlog.css";

function AddBlog() {
  const {addBlog, isLoading, error} = useAddBlog()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      title,
      content
    }
    addBlog(data);
    if (!error) {
      setTitle("");
      setContent("");
    }
  }

  return (
    <section className='box'>
      <div className='error' id='authError'>{error && error.authentication ? error.authentication : ""}</div>
      <Form className="blogForm" onSubmit={submitHandler}>
        <div className='formInput' >
          <div className="heading">Title : </div>
          <textarea name="title" id="title" value={title}  onChange={(e) => setTitle(e.target.value)} required></textarea>
          <div className='error'>{error && error.title ? error.title : ""}</div>
        </div>
        <div className='formInput'>
          <div className="heading">Contetnt : </div>
          <div>
          <textarea name="title" id="content" value={content} onChange={(e) => setContent(e.target.value)} required ></textarea>
          <div className='error'>{error && error.content ? error.content : ""}</div>
          </div>
        </div >
        <div className='btn formInput'>
        <button type='submit'  disabled={isLoading} >Create Blog</button>
        </div>
      </Form>
    </section>
  )
}

export default AddBlog
