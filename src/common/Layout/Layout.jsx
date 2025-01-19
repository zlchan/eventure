import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenuBar from '../SideMenuBar/SideMenuBar';
import Header from '../Header/Header';
import './Layout.css'
const Layout = () => {
    return (
      <div className="layout-container">
        <Header/>
        <div className="side-menu-bar">
          <SideMenuBar />
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    )
};

export default Layout;

