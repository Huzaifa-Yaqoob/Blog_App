import React from 'react'
import { Outlet } from "react-router-dom";

// custom components and files
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

function FirstLayout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer />
    </>
  )
}

export default FirstLayout
