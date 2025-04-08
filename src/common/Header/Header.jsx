import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, User, Settings, LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
        if (!e.target.closest('.user-container')) {
            setShowDropdown(false);
        }
    };

    // Add event listener when component mounts
    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header className='header'>
            <Link className='logo'>
                eventure
            </Link>

            <div className="search-container">
                <div className="search-wrapper">
                    <Search className="search-icon"/>
                    <input type="text" placeholder='Search Events' className='search-input'/>
                </div>

                <div className="location-wrapper">
                    <MapPin className="location-icon"/>
                    <input type="text" placeholder='Neighbourhood, city, zip' className="location-input" />
                </div>
            </div>

            <div className="right-section">
                <button className="header-create-button">
                    <span>+ </span>
                    Create Event
                </button>
                
                <div className={`user-container ${showDropdown ? 'active' : ''}`}>
                    <div className="user" onClick={toggleDropdown}>
                        <div className="avatar">AC</div>
                        <span>Albert Chan</span>
                    </div>
                    
                    {showDropdown && (
                        <div className="user-dropdown">
                            <ul>
                                <li>
                                    <User size={16} />
                                    <span>Account</span>
                                </li>
                                <li>
                                    <Settings size={16} />
                                    <span>Settings</span>
                                </li>
                                <li className="logout">
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;