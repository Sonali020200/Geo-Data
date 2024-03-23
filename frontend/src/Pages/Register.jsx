import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', formData);
      console.log(response.data);
      alert("Registration successful!")
      setFormData({ fullname: '', email: '', password: '' });
      navigate('/login');
    } catch (error) {
      console.error("Error:", error.response.data);
      alert("Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-left text-gray-800 mb-4">Welcome to Geo Data</h2>
          <h3 className="text-3xl font-bold text-left text-gray-700 mb-6 relative">
            Register
            <span className="absolute left-0 bottom-0 h-0.5 w-8 bg-blue-500 rounded-full"></span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="Fullname" 
                name="fullname" 
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email" 
                name="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
            </div>
          </form>
          <p className="mt-4 text-left text-gray-600 text-sm">Already have an account? <Link className='text-blue-500' to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
