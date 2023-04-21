import React from 'react'
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import useLogOut from '../../hooks/useLogout';

import "./Navbar.css";

function Navbar() {
  const {state} = useAuthContext();
  const { logout } = useLogOut();
  const logOutHandler = (e) => {
    logout();
  }

  return (
    <>
    <nav>
      <div className='box navBox'>
        <div id='homeLink'>
            <Link to="/">Blogging</Link>
        </div>
        <ul id='navButton'>
            {state.user ? <li><Link  to="/addblog" >Add Blog</Link></li> : ""}
            {state.user ? <li><Link  to="/profile" ><img src={`http://localhost:5000/${state.user.data.profilePic}`} alt="" /></Link></li> : <li><Link to="/login" >Log In</Link></li>}
            {state.user ? <li><button id='important' onClick={logOutHandler}>Log Out</button></li> : <li><Link  to="/signup" id='important' >Sign In</Link></li>}
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Navbar;
