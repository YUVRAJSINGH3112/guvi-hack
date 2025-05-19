import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [feedback, setFeedback] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); // Track selected feedback category

    useEffect(() => {
        const getFeedback = async () => {
            try {
                const response = await axios.get('https://guvi-hack.onrender.com/feedback/getFeedback');
                setFeedback(response.data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };
        getFeedback();
    }, []);

    const positiveCount = feedback.filter(f => f.category === 'positive').length;
    const negativeCount = feedback.filter(f => f.category === 'negative').length;

    const filteredFeedback = feedback.filter(f => f.category === selectedCategory);

    return (
        <div className='min-h-screen bg-gray-900 p-8 flex flex-col items-center'>
            <h1 className='text-4xl font-bold text-white mb-12'>Admin Dashboard</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-12'>
                {/* Positive Feedback Card */}
                <div
                    className='bg-green-700 text-white w-80 h-60 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer'
                    onClick={() => setSelectedCategory('positive')} // Set selected category to "positive"
                >
                    <h2 className='text-3xl font-bold mb-4'>Positive Feedback</h2>
                    <p className='text-6xl font-extrabold text-green-200'>{positiveCount}</p>
                    <span className='text-lg mt-4'>Total positive feedback</span>
                </div>

                {/* Negative Feedback Card */}
                <div
                    className='bg-red-700 text-white w-80 h-60 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer'
                    onClick={() => setSelectedCategory('negative')} // Set selected category to "negative"
                >
                    <h2 className='text-3xl font-bold mb-4'>Negative Feedback</h2>
                    <p className='text-6xl font-extrabold text-red-200'>{negativeCount}</p>
                    <span className='text-lg mt-4'>Total negative feedback</span>
                </div>
            </div>

            {/* Feedback List */}
            {selectedCategory && (
                <div className='mt-12 w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg'>
                    <h2 className={`text-2xl font-bold mb-6 ${selectedCategory === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedCategory === 'positive' ? 'Positive Feedback' : 'Negative Feedback'}
                    </h2>
                    <ul className='space-y-4'>
                    {filteredFeedback.map((item, idx) => (
                <li
                 key={idx}
                            className={`p-4 rounded-lg shadow-md ${
                              selectedCategory === 'positive'
                                   ? 'bg-green-700 text-white'
                              : 'bg-red-700 text-white'
                            }`}
                            >
                <p className='text-lg font-semibold'>{item.title}</p>
                 <span className='text-sm text-gray-300'>{item.feedbackText}</span>
                      </li>
                     ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;