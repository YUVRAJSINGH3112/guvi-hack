import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    return (
        <nav className="bg-white px-8 py-4 shadow-md fixed w-full top-0 flex justify-between items-center z-50 mb-2">
            <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-gray-800">⚫ Pulse</span>
                <ul className="flex space-x-6 text-gray-600">
                    <li>
                        <Link 
                            to="/" 
                            onClick={() => handleLinkClick('/')} 
                            className={`${activeLink === '/' ? 'text-black font-semibold' : ''}`}
                        >Home</Link>
                    </li>
                    <li>
                        <Link 
                            to="/events" 
                            onClick={() => handleLinkClick('/events')} 
                            className={`${activeLink === '/events' ? 'text-black font-semibold' : ''}`}
                        >Events</Link>
                    </li>
                    <li>
                        <Link 
                            to="/clubs" 
                            onClick={() => handleLinkClick('/clubs')} 
                            className={`${activeLink === '/clubs' ? 'text-black font-semibold' : ''}`}
                        >Clubs</Link>
                    </li>
                   
                </ul>
            </div>
            <div className="flex space-x-4 text-gray-600">
                <Search className="w-6 h-6 cursor-pointer" />
                <Bell className="w-6 h-6 cursor-pointer" />
                <User className="w-6 h-6 cursor-pointer" />
            </div>
        </nav>
    );
};

export default Navbar;
