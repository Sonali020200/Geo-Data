import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Login.css';
import login from "../images/login.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      localStorage.setItem('token', response.data.token);
      console.log(response.data);
      localStorage.setItem('userId', response.data.userId);
      alert("Logged in successfully. Welcome back!");
      navigate('/');
    } catch (error) {
      alert("An error occurred. Could not log in. Please try again.");
    }
  };

  return (
    <>
      <div className='container'>
        <div className="left-container">
          <img src={login} alt="login-img" />
        </div>
        <div className="right-container">
          <h2>Login !</h2>
          <p> Welcome to Geo Data...</p>
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email......" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br/>
            <input 
              type="password" 
              placeholder="Password......" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /><br/>
            <p><span style={{ color: 'red' }}>not an existing user? </span> <Link className='register' to="/register">Register</Link></p>
            <button type="submit" className='btn btn1'>LogIn</button><br/>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
