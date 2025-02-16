import React, { useState } from "react";
import './Events.css'
import { Calendar, Users, BarChart, Plus } from 'lucide-react'
import CreateEventModal from '../../components/CreateEventModal/CreateEventModal';

const Events = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    // sample event data - need replace with database and backend data
    const events = [
        {
            id: 1,
            title: "Annual Tech Conference",
            date: "2025-03-15",
            attendess: 120,
            status: "upcoming",
            description: "hehexd",
        },
        {
            id: 1,
            title: "Team Building Workshop",
            date: "2025-02-28",
            attendess: 45,
            status: "completed",
            description: "hehexd2",
        }
    ];

    const quickTools = [
        {
            title: "Reservations",
            icon: <Calendar />,
            description: "Manage event bookings",
        },
        {
            title: "Attendees",
            icon: <Users />,
            description: "View and manage participants",
        },
        {
            title: "Analytics",
            icon: <BarChart />,
            description: "Event performance metrics",
        },
    ]

    return (
        <div className="events-container">
            <div className="events-header">
                <h1>My Events</h1>
                <button className="events-create-button"
                    onClick={() => setIsCreateModalOpen(true)}>
                    <Plus></Plus>
                    Create Event
                </button>
            </div>

            <CreateEventModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreateEvent={(eventData) => {
                    // Handle the event creation here
                    console.log(eventData);
                    // You'll want to add this to your events array or send to backend

                }}
            />

            <div className="quick-tools">
                {quickTools.map((tool, index) => (
                    <div key={index} className="tool-card">
                        <div className="tool-icon">
                            {tool.icon}
                        </div>
                        <h3>{tool.title}</h3>
                        <p>{tool.description}</p>
                    </div>
                ))}
            </div>

            <div className="events-section">
                <h2>Existing Evetns</h2>
                {events.length > 0 ? (
                    <div className="events-grid">
                        {events.map((event) => (
                            <div key={event.id} className="event-card">
                                <div className="event-header">
                                    <h3>{event.title}</h3>
                                    <span className={`status-badge ${event.status}`}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="event-details">
                                    <div className="event-date">
                                        {new Date(event.date).toLocaleDateString()}
                                    </div>
                                    <div className="event-attendees">
                                        <Users></Users>
                                        <span>{event.attendess} attendees</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        No events created yet. Click the "Create Event" button to get started.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Events