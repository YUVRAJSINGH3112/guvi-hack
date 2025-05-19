import React from 'react';
import { Link } from 'react-router-dom';

const RecentEvent = () => {
    const feedbacks = [
        { id: 1, title: 'Great website!', link: '/feedback/1' },
        { id: 2, title: 'Needs improvement in navigation.', link: '/feedback/2' },
        { id: 3, title: 'Loved the design and responsiveness.', link: '/feedback/3' },
    ];

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Events</h2>
            <ul className="space-y-6">
                {feedbacks.map((feedback) => (
                    <li key={feedback.id} className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-800 text-lg">{feedback.title}</span>
                        <Link
                            to={feedback.link}
                            className="text-sm px-3 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            View
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentEvent;