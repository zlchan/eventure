import React, { useState, useEffect} from 'react'
import { ChevronLeft, ChevronRight} from 'lucide-react';
import EventList from '../../components/EventList/EventList';
import { eventService } from '../../services/api/eventApi';
import './Explore.css'

const Explore = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchCategories = async () => {
        setIsLoading(true);
        try {
          const categoriesData = await eventService.fetchCategories();
          const processedCategories = categoriesData
            .filter(cat => cat.segment && cat.segment.name !== "Undefined")
            .map(cat => ({
              value: cat.segment.id,
              label: cat.segment.name,
            }));
          setCategories(processedCategories);
        } catch (err) {
          setError('Failed to load categories');
          console.error('Error:', err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchCategories();
    }, []);

    useEffect(() => {
      const fetchEvents = async () => {
        if (!selectedCategory) return;

        setIsLoading(true);
        try {
          const events = await eventService.fetchEvents({
            date: selectedDate,
            categoryId: selectedCategory
          });
          setEvents(events);
        } catch (e) {
          setError('Failed to load events');
        } finally {
          setIsLoading(false);
        }
      };
      fetchEvents();

    }, [selectedDate, selectedCategory])

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return {
            daysInMonth: new Date(year, month + 1, 0).getDate(),
            firstDay: new Date(year, month, 1).getDay(),
        }
    }

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const handlePrevMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
    };

    const renderCalendarDays = () => {
        const { daysInMonth, firstDay } = getDaysInMonth(selectedDate);
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<button key={`empty-${i}`} className="calendar-day empty"></button>)
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected = day === selectedDate.getDate();
            const isToday =
                day === new Date().getDate && 
                selectedDate.getMonth() === new Date().getMonth() &&
                selectedDate.getFullYear() === new Date().getFullYear();
                
            days.push(
                <button 
                    key={day}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                >
                    {day}
                </button>
                );
        }

        return days;
    };

    if (error) {
        return (
            <div className="explorer-container">
                <div className="content-wrapper">
                    <div className="error-state">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="retry-button">
                        Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="explorer-container">
        <div className="content-wrapper">
          <div className="page-title">
            <h1>Discover Events</h1>
            <p>Select a category and date to explore events</p>
          </div>
  
          <div className="main-grid initial-view">
            <div className="filters-section">
              <div className="category-select">
                <label className="select-label">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="select-input"
                  disabled={isLoading}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Calendar Section */}
              <div className="calendar-section">
                <div className="calendar-header">
                  <button className="calendar-nav-button" onClick={handlePrevMonth}>
                    <ChevronLeft size={20} />
                  </button>
                  <span className="calendar-month">
                    {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <button className="calendar-nav-button" onClick={handleNextMonth}>
                    <ChevronRight size={20} />
                  </button>
                </div>
    
                <div className="calendar-grid">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="calendar-weekday">{day}</div>
                  ))}
                  {renderCalendarDays()}
                </div>
    
                <div className="quick-select">
                  <button 
                    className="quick-select-button"
                    onClick={() => {
                      const today = new Date();
                      setSelectedDate(today);
                    }}
                  >
                    Today
                  </button>
                  <button 
                    className="quick-select-button"
                    onClick={() => {
                      const today = new Date();
                      const nextWeekend = new Date(today);
                      nextWeekend.setDate(today.getDate() + (6 - today.getDay()));
                      setSelectedDate(nextWeekend);
                    }}
                  >
                    This weekend
                  </button>
                  <button 
                    className="quick-select-button"
                    onClick={() => {
                      const today = new Date();
                      const nextWeek = new Date(today);
                      nextWeek.setDate(today.getDate() + 7);
                      setSelectedDate(nextWeek);
                    }}
                  >
                    Next week
                  </button>
                </div>
              </div>
            </div>
              <div className="events-section">
                <h2 className="section-title">Events</h2>
                {isLoading ? (
                  <div className="loading-state">Loading events...</div>
                ) : (
                  <EventList events={events} />
                )}
              </div>
            </div>
        </div>
      </div>
    )
}

export default Explore