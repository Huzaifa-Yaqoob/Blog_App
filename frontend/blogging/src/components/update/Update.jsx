import React, { useState } from 'react';
import { Form } from 'react-router-dom';

// custom files and compinents
import "./Update.css";
import useUpdate from '../../hooks/useUpdate';
import useAuthContext from '../../hooks/useAuthContext';

function Update() {
  const { state } = useAuthContext()
  const {update, isLoading, error} = useUpdate();
  const [email, setEmail] = useState(state.user.data.email);
  const [name, setName] = useState(state.user.data.name);
  const [profilePic, setProfilePic] = useState("");
  // const data = {email, name, profilePic};
  // console.log(data);
  // console.log(profilePic);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("name", name);
    data.append("profilePic", profilePic);
    console.log(JSON.stringify(data));
    update(data);
    if (error === null) {
      setEmail(state.user.data.email);
      setName(state.user.data.name);
    }
  }
  
  return (
    <section>
      <div className='box formBox'>
        <Form method='post' id='Sform' onSubmit={submitHandler} encType="multipart/form-data">
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
            <label htmlFor="password">Profile Pic : </label>
            <input type="file" name="profilePic" onChange={(e) => setProfilePic(e.target.files[0]) } />
            <div className='error'>{error && error.image ? error.image : ""}</div>
          </div>
          <div id="Sbtn">
            <button type='submit' disabled = {isLoading} >Update</button>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default Update;