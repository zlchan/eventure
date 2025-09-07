import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideMenuBar from '../SideMenuBar/SideMenuBar';
import Header from '../Header/Header';
import './Layout.css';

const Layout = ({
  showHeader = true,
  showSidebar = true,
  headerHeight = '64px',
  sidebarWidth = '240px',
  mobileBreakpoint = 768,
  contentPadding = { desktop: '40px 80px', tablet: '20px 40px', mobile: '20px' },
  customStyles = {},
  onSidebarToggle
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (onSidebarToggle) onSidebarToggle(!isSidebarOpen);
  };

  return (
    <div className="layout-container" style={customStyles.container}>
      {showHeader && (
        <Header 
          height={headerHeight} 
          onMenuToggle={toggleSidebar} 
          style={customStyles.header}
        />
      )}
      
      {showSidebar && (
        <div 
          className={`side-menu-bar ${isSidebarOpen ? 'active' : ''}`}
          style={{
            width: sidebarWidth,
            top: showHeader ? headerHeight : '0',
            ...customStyles.sidebar
          }}
        >
          <SideMenuBar style={customStyles.sidebarContent} />
        </div>
      )}
      
      <div 
        className="content-container"
        style={{
          marginLeft: showSidebar ? sidebarWidth : '0',
          marginTop: showHeader ? headerHeight : '0',
          padding: contentPadding.desktop,
          ...customStyles.content
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;