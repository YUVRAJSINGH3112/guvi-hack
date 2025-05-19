import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const getFeedback = async () => {
            try {
                const response = await axios.get('http://localhost:3000/feedback/getFeedback');
                setFeedback(response.data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };
        getFeedback();
    }, []);

    const positiveCount = feedback.filter(f => f.category === 'positive').length;
    const negativeCount = feedback.filter(f => f.category === 'negative').length;

    return (
        <div className='min-h-screen bg-gray-900 p-8 flex flex-col items-center'>
            <h1 className='text-4xl font-bold text-white mb-12'>Admin Dashboard</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-12'>
                {/* Positive Feedback Card */}
                <div className='bg-green-700 text-white w-80 h-60 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center transform hover:scale-105 transition-transform'>
                    <h2 className='text-3xl font-bold mb-4'>Positive Feedback</h2>
                    <p className='text-6xl font-extrabold text-green-200'>{positiveCount}</p>
                    <span className='text-lg mt-4'>Total positive feedback</span>
                </div>

                {/* Negative Feedback Card */}
                <div className='bg-red-700 text-white w-80 h-60 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center transform hover:scale-105 transition-transform'>
                    <h2 className='text-3xl font-bold mb-4'>Negative Feedback</h2>
                    <p className='text-6xl font-extrabold text-red-200'>{negativeCount}</p>
                    <span className='text-lg mt-4'>Total negative feedback</span>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
