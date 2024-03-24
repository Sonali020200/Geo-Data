import React from 'react';
import home from "../images/home.img.png";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home text-center text-white bg-gray-300">
            <img src={home} alt="Home" className="w-full h-screen object-cover" />
        </div>
    );
};

export default Home;
