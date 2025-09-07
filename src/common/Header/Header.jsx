import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './../../contexts/AuthContext';
import { Search, MapPin, User, Settings, LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
    const { logout } = useAuth();
    const { user } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const getAvatarName = (name) => {
        if (!name) return '';
        return name.split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase();
    }

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
                        <div className="avatar">{getAvatarName(user.username)}</div>
                        <span>{user.username}</span>
                    </div>
                    
                    {showDropdown && (
                        <div className="user-dropdown">
                            <ul>
                                <li>
                                    <Link to="/account" className='dropdown-link'>
                                        <User size={16} />
                                        <span>Account</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/settings" className='dropdown-link'>
                                        <Settings size={16} />
                                        <span>Settings</span>
                                    </Link>
                                </li>
                                <li className="logout" onClick={() => logout()}> 
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