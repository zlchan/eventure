import axios from "axios";
const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export const eventService = {
    getTodayEvents: async () => {
      const today = new Date().toLocaleDateString('en-CA')
      const params = {
        startDateTime: `${today}T00:00:00Z`,
        endDateTime: `${today}T23:59:59Z`,
        size: 200,
        sort: 'date,asc'
      };

      try {
        const response = await fetch(
          `${BASE_URL}/events.json?apikey=${API_KEY}&${new URLSearchParams(params)}`
        );
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json();
        const todayEvents = data._embedded?.events || [];
    
        const onSaleTodayEvent = todayEvents
          .filter(event => event.dates?.status?.code === 'onsale')
          .sort((a, b) => new Date(a.dates?.start?.dateTime) - new Date(b.dates?.start?.dateTime))
          .slice(0, 6);
        return onSaleTodayEvent;
      } catch (e) {
        throw new Error(`Error fetching today's events: ${e.message}`);
      }
    },

    getWeekEvents: async (category = '') => {
      const startDate = new Date().toLocaleDateString('en-CA'); // Today's date in YYYY-MM-DD
      const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA'); // 7 days later in YYYY-MM-DD
      
      const params = {
        startDateTime: `${startDate}T00:00:00Z`,
        endDateTime: `${endDate}T23:59:59Z`,
        size: 200,
        sort: 'date,asc'
      };
  
      if (category && category !== 'all') {
        params.classificationName = category;
      }
  
      try {
        const response = await fetch(
          `${BASE_URL}/events.json?apikey=${API_KEY}&${new URLSearchParams(params)}`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const weeklyEvents = data._embedded?.events || [];

        const onSaleWeeklyEvent = weeklyEvents
          .filter(event => event.dates?.status?.code === 'onsale')
          .slice(0, 6);
        return onSaleWeeklyEvent;
      } catch (e) {
        throw new Error(`Error fetching week's events: ${e.message}`);
      }
    },

    fetchCategories: async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/classifications?apikey=${API_KEY}`
          );
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          return data._embedded.classifications;
        } catch (e) {
          throw new Error(`Error fetching classifications: ${e.message}`);
        }
    },

    async getExploreEvents({ startDate, endDate, classificationId, page = 0 }) {
      try {
        let url = `${BASE_URL}/events.json?apikey=${API_KEY}&locale=*&size=20&page=${page}`;
        
        if (startDate) {
          url += `&startDateTime=${startDate}T00:00:00Z`;
        }
        if (endDate) {
          url += `&endDateTime=${endDate}T23:59:59Z`;
        }
        if (classificationId) {
          url += `&classificationId=${classificationId}`;
        }
  
        const response = await fetch(url);
        const data = await response.json();
        return {
          events: data._embedded?.events || [],
          page: data.page || {},
        };
      } catch (error) {
        console.error('Error fetching events:', error);
        return { events: [], page: {} };
      }
    },

    async fetchEvents({ date, categoryId }) {
      try {
        const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const response = await axios.get(`${BASE_URL}/events?apikey=${API_KEY}`, {
          params: {
            date: formattedDate,
            classificationId: categoryId,
          }
        });
  
        return response.data;
      } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
    },
}