import React, { useState,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';


const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginUser = async () => {
        try {
            const response = await axios.post('http://localhost:3000/user/login', {
                email,
                password,
            },{
                withCredentials: true,
            });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                login();
                navigate('/');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    const handleLogin = (e) => {
        e.preventDefault();
        if(!email || !password){
            alert('Please fill in all fields');
            return;
        }
        loginUser();
        setEmail('');
        setPassword('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="w-full max-w-sm bg-white shadow-2xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-left">Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col space-y-6 text-left">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className='text-sm'>
                      Are you an admin? <Link to={'/adminlogin'} className='text-blue-800'>Login here!</Link>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
