import React, { useState } from 'react';
import { Form } from 'react-router-dom';

// custom files and compinents
import useLogIn from "../../hooks/useLogIn";
import "./Login.css";

function Login() {
  const {login, isLoading, error} = useLogIn(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = {email, password};
  const submitHandler = async (e) => {
    e.preventDefault();
    await login(data);

    if (error === null) {
      setEmail("");
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
            <label htmlFor="password">Enter Password : </label>
            <input type="password" name="password" id="password" onChange={(e) => {setPassword(e.target.value)}} value={password} />
            <div className='error'>{error && error.password ? error.password : ""}</div>
          </div>
          <div id="Sbtn">
            <button type='submit' disabled = {isLoading} >Log In</button>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default Login;