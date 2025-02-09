// src/pages/Home/Home.jsx
import React, { useState, useEffect } from "react";
import EventCard from "../../components/EventCard/EventCard";
import EventFilterTab from "../../components/EventFilterTab/EventFilterTab";
import EventCategoryGrid from "../../components/EventCategoryGrid/EventCategoryGrid";
import { eventService } from "../../services/api/ticketmasterApi"
import './Home.css';
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [todayEvents, setTodayEvents] = useState([]);
  const [weeklyEvents, setWeeklyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const formatEvents = (events) => {
    if (!events || !events._embedded || !events._embedded.events) {
      return [];
    }
    
    return events._embedded.events.map(event => ({
      id: event.id,
      name: event.name,
      date: event.dates.start.localDate,
      venue: event._embedded?.venues?.[0]?.name || event.place?.city.name,
      price: event.priceRanges && event.priceRanges[0].min && event.priceRanges[0].max
      ? `${Math.round((event.priceRanges[0].min + event.priceRanges[0].max) / 2)} ${event.priceRanges[0].currency} (Avg.)`
      : 'Price TBA',     
      imageUrl: event.images.find(img => img.ratio === '16_9' && img.url.startsWith('https://images'))?.url || event.images.find(img => img.url.startsWith('https://images'))?.url || event.images[0]?.url,
      category: event.classifications?.[0]?.segment?.name || 'Other',
      onTicketClick: () => window.open(event.url, '_blank')
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [todayData, weekData] = await Promise.all([
          eventService.getTodayEvents(),
          eventService.getWeekEvents(),
        ]);
        setTodayEvents(formatEvents(todayData));
        setWeeklyEvents(formatEvents(weekData));
      } catch (e) {
        console.log('error', e)
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchWeekEvents = async () => {
      try {
        const data = await eventService.getWeekEvents(
          selectedCategory === 'all' ? null : selectedCategory
        );
        setWeeklyEvents(formatEvents(data));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeekEvents();
  }, [selectedCategory])

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      <h1 className="welcome-title">Hey there, Albert Chan</h1>
      <h1 className="home-title">What’s On Today</h1>
      <div className="events-grid">
        {todayEvents.map(event => (
          <EventCard 
            key={event.id}
            event={event}
          />
        ))}
      </div>
      <EventCategoryGrid/>
      <h1 className="home-title">Upcoming Events</h1>
      <EventFilterTab onCategoryChange={ handleCategoryChange }/>

      <div className="events-grid">
        {weeklyEvents.map(event => (
          <EventCard  
            key={event.id} 
            event={event} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;