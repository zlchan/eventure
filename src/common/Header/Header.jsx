import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import './Header.css'

const Header = () => {
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
                
                <div className="user">
                    <div className="avatar">AC</div>
                    <span>Albert Chan</span>
                </div>
            </div>
        </header>
    )
}

export default Header;