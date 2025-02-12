import React from "react";
import { Calendar, MapPin, ExternalLink, Tag } from "react-feather";
import "./EventList.css";

const EventList = ({ events, isLoading }) => {
  const eventList = events?._embedded?.events || [];

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return 'Date not specified';
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="events-list-container">
        <div className="events-grid">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="event-card-skeleton">
              <div className="skeleton-image" />
              <div className="skeleton-content">
                <div className="skeleton-title" />
                <div className="skeleton-meta" />
                <div className="skeleton-meta" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!eventList?.length) {
    return (
      <div className="events-list-container">
        <div className="empty-state">
          No events found for the selected date and category
        </div>
      </div>
    );
  }

  return (
    <div className="events-list-container">
        <div className="events-list">
            {eventList.map((event) => {
                const image = event.images?.find(img => img.ratio === '16_9' && img.url.startsWith('https://images'))?.url || 
                event.images?.[0]?.url;

                return (
                    <div key={event.id} className="event-item">
                        <div className="event-image-wrapper">
                            <img src={image} alt={event.name} className="event-image" />
                            <span className="event-category">
                                {event.classifications?.[0]?.segment?.name || 'Event'}
                            </span>
                        </div>

                        <div className="event-content">
                            <div className="event-list-header">
                                <h3 className="event-title">{event.name}</h3>
                                <div className="event-meta">
                                    <div className="meta-item">
                                        <Calendar size={16} className="meta-icon"/>
                                        <span>{formatDateTime(event.dates?.start?.dateTime)}</span>
                                    </div>
                                    <div className="meta-item">
                                        <MapPin size={16} className="meta-icon"/>
                                        <span>{event._embedded?.venues?.[0]?.name || 'Venue not specified'}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="event-description">
                                {event.info || event.pleaseNote || "No description available"}
                            </p>

                            <div className="event-actions">
                                <button onClick={() => window.open(event.url, '_blank')} className="btn btn-details">
                                    <ExternalLink size={16}/>
                                    Details
                                </button>
                                {event.url && (
                                    <button onClick={() => window.open(event.url, '_blank')} className="btn btn-book">
                                        <Tag size={16}/>
                                        Book Ticket
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  );
};

export default EventList;