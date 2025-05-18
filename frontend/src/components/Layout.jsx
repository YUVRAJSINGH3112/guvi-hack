import { Outlet,useLocation } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login'||location.pathname === '/adminlogin';
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideNavbar && <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">© 2025 Hackathon. All rights reserved</p>
        </div>
      </footer>}
    </div>
  );
} 