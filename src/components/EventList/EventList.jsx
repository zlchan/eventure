import React from "react";
import "./EventList.css"

const EventList = ({ events }) => {
    const eventList = events?._embedded?.events || [];

    if (!eventList?.length) {
        return (
            <div className="empty-state">
                <p>No events found for the selected date and category</p>
            </div>
        )
    }
    return(
        <div className="events-list">
        {eventList.map((event) => {
          const image = event.image?.find(img => img.ratio === '16_9' && img.url.startsWith('https://images'))?.url || 
                        event.images?.find(img => img.url.startsWith('https://images'))?.url || 
                        event.images?.[0]?.url;

          return (
            <div key={event.id} className="event-list-card">
              <div className="event-image">
                <img src={image} alt={event.name} className="h-28 w-48 object-cover"/>
              </div>
              <div className="event-content">
                <div className="event-details">
                  <div className="event-header">
                    <h3 className="event-title">{event.name}</h3>
                    <div className="event-meta">
                      <span className="event-meta-item">
                        <span>
                          {event._embedded?.venues?.[0]?.name || 'Venue not specified'}
                        </span>
                      </span>
                      <span className="event-meta-item">
                        <span>
                          {event.dates?.start?.dateTime
                            ? new Date(event.dates.start.dateTime).toLocaleString()
                            : 'Date not specified'}
                        </span>
                      </span>
                    </div>
                    <div className="action-buttons">
                      <button 
                        className="icon-button"
                        onClick={() => window.open(event.url, '_blank')}
                      >
                        Details
                      </button>
                      {event.url && (
                        <button 
                          className="ticket-button"
                          onClick={() => window.open(event.url, '_blank')}
                        >
                          Book Ticket
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          
        })}
      </div>
    );
}

export default EventList;