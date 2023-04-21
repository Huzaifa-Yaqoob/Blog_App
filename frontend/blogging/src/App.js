import { 
   Route,
   RouterProvider, 
   createBrowserRouter, 
   createRoutesFromChildren 
} from 'react-router-dom';
import React from "react";
import { useEffect } from 'react';

// custom files and components
import Home from './pages/home/Home';
import FirstLayout from "./layout/FirstLayout";
import { blogsLoader } from './components/blogbox/Blogbox';
import SignUpForm from './pages/signupform/SignUpForm';
import Error from './pages/error/Error';
import LogInForm from './pages/loginform/LogInForm';
import AddBlog from './pages/addblogform/AddBlogForm';
import Profile from "./pages/profile/Profile";
import useAuthContext from './hooks/useAuthContext';
import UpdateForm from './pages/updateform/UpdateForm';

const routers = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path='/' element={<FirstLayout />}> 
        <Route  
        index
        loader={blogsLoader}
        element={ <Home /> } 
        />
        <Route />
        <Route path="signup" element={<SignUpForm />} />
        <Route path="login" element={<LogInForm />}/>
        <Route path="addblog" element={<AddBlog />} />
        <Route path="profile" element={<Profile />} />
        <Route path="update" element={<UpdateForm />} />
        <Route path='*' element={<Error />}/>
      </Route>
      </>
  )
);

function App() {
  const { dispatch } = useAuthContext();
  useEffect(()=> {
    const user = localStorage.getItem("user");
    if (user) {
      
      dispatch({type: "LOG_IN", payload: JSON.parse(user)});
    }
  }, [dispatch]);
  return (
    <RouterProvider router={routers} />
  );
}

export default App;
