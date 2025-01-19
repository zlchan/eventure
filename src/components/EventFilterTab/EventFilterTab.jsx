import React, { useState } from 'react'
import './EventFilterTab.css';

const EventFilterTab = ({ onCategoryChange }) => {
    const [activeTab, setActiveTab] = useState('all');
    const onClickTab = (category) => {
        setActiveTab(category);
        onCategoryChange(category);
    }

    return (
        <div className="event-filters">
            <div className="event-filter-tabs">
                <button
                    className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => onClickTab('all')}
                >
                    All Events
                </button>
                <button
                    className={`filter-tab ${activeTab === 'film' ? 'active' : ''}`}
                    onClick={() => onClickTab('film')}
                >
                    Film
                </button>
                <button
                    className={`filter-tab ${activeTab === 'sports' ? 'active' : ''}`}
                    onClick={() => onClickTab('sports')}
                >
                   Sports
                </button>
                <button
                    className={`filter-tab ${activeTab === 'theatre' ? 'active' : ''}`}
                    onClick={() => onClickTab('theatre')}
                >
                    Theatre
                </button>
                <button
                    className={`filter-tab ${activeTab === 'miscellaneous' ? 'active' : ''}`}
                    onClick={() => onClickTab('miscellaneous')}
                >
                    Miscellaneous
                </button>
            </div>
        </div>
    )
}

export default EventFilterTab;