import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

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

  const handleEventClick = async (eventId) => {
    setSelectedEvent(eventId);
    try {
      const response = await fetch(`http://localhost:3000/events`); // Replace with your API URL
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      const data = await response.json();
      setFeedback(data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
    }
  };

  const handleDelete = async (eventId) => {
    console.log("Event ID to delete:", eventId);  
    try {
      const response = await fetch(`http://localhost:3000/event/delete/${eventId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
        console.log("Deleted:", data.message);
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500 font-semibold">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Events</h1>
      
      <button
        onClick={() => setEditingEvent({ name: '', description: '', organizer: '' })}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Add New Event
      </button>

      {editingEvent && (
        <EventForm
          event={editingEvent}
          onSubmit={handleFormSubmit}
          onCancel={() => setEditingEvent(null)}
        />
      )}

      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event._id}
            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-800">{event.name}</h2>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <div className="mt-4 text-sm text-gray-500">
              Organizer: {event.organizer}
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditingEvent(event)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Event;
