import React, { useState, useEffect } from 'react';
import './SideMenuBar.css';
import { Link, useLocation } from 'react-router-dom';
import { BsSearch, BsHouse, BsCalendar2Check, BsStar, BsInfoCircle, BsPerson, BsQuestionCircle } from "react-icons/bs";

const SideMenuBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { to: '/', icon: <BsHouse className='icon' />, label: 'Home' },
    { to: '/explore', icon: <BsSearch className='icon' />, label: 'Explore' },
    { to: '/events', icon: <BsCalendar2Check className='icon'/>, label: 'Event' },
    { to: '/favorites', icon: <BsStar className='icon'/>, label: 'Favourite' },
    { to: '/about', icon: <BsInfoCircle className='icon'/>, label: 'About' },
    { to: '/help', icon: <BsQuestionCircle className='icon'/>, label: 'Help' },
    { to: '/account', icon: <BsPerson className='icon'/>, label: 'Account' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }

  return (
    <div className={`side-menu-bar ${isCollapsed ? 'collapsed' : ''}`}>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>
            <div className={`menu-border ${isActive(item.to) ? 'active' : ''}`}>
            {item.icon}
                <span className="menu-text">{item.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenuBar;
