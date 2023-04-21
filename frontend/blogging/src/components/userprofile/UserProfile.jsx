import React from 'react'
import { Link } from 'react-router-dom';

import useAuthContext from '../../hooks/useAuthContext';
import "./UserProfile.css";

function UserProfile() {
  const { state } = useAuthContext();
  return (
    <section className="box" id="userSection">
      <div id="profileBox">
        <div id="headingBox" >User Profile</div>
        <div id="emailBox" className='UBox' >
          <span>User`s Email</span>
          <span>{state.user.data.email}</span>
        </div>
        <div id="nameBox" className='UBox' >
          <span>User`s Name</span>
          <span>{state.user.data.name}</span>
        </div>
        <div><Link to="/update"> Update</Link></div>
      </div>
    </section>
  )
}

export default UserProfile
