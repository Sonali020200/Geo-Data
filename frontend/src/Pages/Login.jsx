import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      alert("Login successfully!");
      navigate('/');
    } catch (error) {
      alert("Please try again!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-left text-gray-800 mb-4">Welcome to Geo Data</h2>
          <h3 className="text-3xl font-bold text-left text-gray-700 mb-6 relative">
  Login
  <span className="absolute left-0 bottom-0 h-0.5 w-8 bg-blue-500 rounded-full"></span>
</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="email" 
                placeholder="Email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
            </div>
          </form>
          <p className="mt-4 text-left text-red-600 text-sm">Not an existing user? <Link className='text-blue-500' to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
