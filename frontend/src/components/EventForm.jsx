import React, { useState } from 'react';

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [name, setName] = useState(event ? event.name : '');
  const [description, setDescription] = useState(event ? event.description : '');
  const [organizer, setOrganizer] = useState(event ? event.organizer : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, organizer });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Event Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-2 p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Organizer</label>
        <input
          type="text"
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          className="w-full mt-2 p-2 border rounded-lg"
          required
        />
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="text-gray-600">Cancel</button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
      </div>
    </form>
  );
};

export default EventForm;
