import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.css';
import login from "../images/login.png";
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
    <div className='container'>
      <div className="left-container">
        <img src={login} alt="login-img" />
      </div>
      <div className="right-container">
        <h2>Register !</h2>
        <p> Welcome to Geo Data...</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Fullname......"
            name="fullname"
            value={formData.fullname}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            required
          /><br />
          <input
            type="email"
            placeholder="Email......"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          /><br />
          <input
            type="password"
            placeholder="Password......"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          /><br />
          <p> <span style={{ color: 'red' }}>already have an account?</span> <Link className='login' to="/login">Login</Link></p>
          <button type="submit" className='btn btn1'>Register</button><br />
        </form>
      </div>
    </div>
  );
}

export default Register;
