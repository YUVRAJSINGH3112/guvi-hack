import React, { useState } from 'react';
import axios from 'axios'

const Feedback = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [feedbackdata,setFeedBackData]=useState([])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response =await axios.post("http://localhost:3000/feedback/submit", {
            title,
            feedbackText: description
        });        
        setFeedBackData(response.data.feedback)
        setTitle('');
        setDescription('');
    };

    return (
        <div className=" flex-grow self-start max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">College Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter complaint title"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter complaint description"
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Submit</button>
            </form>
        </div>
    );
};

export default Feedback;
