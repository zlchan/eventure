// src/components/EventCard/EventCard.jsx
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './EventCard.css';

const EventCard = ({ event }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { 
    name, 
    date, 
    venue, 
    price, 
    imageUrl, 
    category, 
    onTicketClick 
  } = event;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const addFavourite = (e) => {
    e.preventDefault();
    setIsFavourite(!isFavourite);
  }

  return (
    <div className="event-card-wrapper">
      <div className="event-card">
        <div className="event-card-image-wrapper">
          <img 
            src={imageUrl} 
            alt={name} 
            className="event-card-image"
            onError={(e) => {
              e.target.src = '/api/placeholder/400/200';
            }}
          />
          <div className="event-card-overlay">
            {category && (
              <span className="event-card-category">{category}</span>
            )}
          </div>
        </div>

        <button
          onClick={addFavourite}
          className={`favourite-button ${isFavourite ? 'is-favourite' : ''}`}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Star className="favourite-icon" />
        </button>

        <div className="event-card-content">
          <div className="event-card-text">
            <h3 className="event-card-title" title={name}>{name}</h3>
            <p className="event-card-info">{venue}</p>
            <p className="event-card-info-date">{formatDate(date)}</p>
          </div>
          <div className="event-card-footer">
            <button 
              onClick={onTicketClick}
              className="event-card-ticket-button"
              aria-label="Get tickets"
            >
              Get Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;