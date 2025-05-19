import React, { useState, useEffect } from 'react';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/event/events'); 
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Events</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-800">{event.name}</h2>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <div className="mt-4 text-sm text-gray-500">
              Organizer: {event.organizer}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Event;