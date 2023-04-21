import React, { useState } from 'react';
import { Form } from 'react-router-dom';

// custom files and compinents
import useSignUp from "../../hooks/useSignUp";
import "./Signup.css";

function Signup() {
  const {signup, isLoading, error} = useSignUp();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const data = {email, name, password};
  const submitHandler = (e) => {
    e.preventDefault();
    signup(data);
    if (error === null) {
      setEmail("");
      setName("");
      setPassword("");
    }
  }
  
  return (
    <section>
      <div className='box formBox'>
        <Form method='post' id='Sform' onSubmit={submitHandler}>
          <div id='heading'>Log In</div>
          <div className='input email'>
            <label htmlFor="email">Enter Email : </label>
            <input type="email" name='email' id='email'  onChange={(e) => {setEmail(e.target.value)}} value={email} />
            <div className='error'>{error && error.email ? error.email : ""}</div>
          </div>
          <div className="input namel">
            <label htmlFor="name">Enter Name : </label>
            <input type="text" name="name" id="name" onChange={(e) => {setName(e.target.value)}} value={name} />
            <div className='error'>{error && error.name ? error.name : ""}</div>
          </div>
          <div className="input namel">
            <label htmlFor="password">Enter Password : </label>
            <input type="password" name="password" id="password" onChange={(e) => {setPassword(e.target.value)}} value={password} />
            <div className='error'>{error && error.password ? error.password : ""}</div>
          </div>
          <div id="Sbtn">
            <button type='submit' disabled={isLoading} >Sign In</button>
          </div>
        </Form>
      </div>
    </section>
  );
}


export default Signup;
