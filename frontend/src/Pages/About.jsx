import React from 'react';

const About = () => {
    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">About GeoData App</h1>
            <p className="text-lg leading-relaxed">
                The GeoData app is a platform for users to upload and manage .geojson files containing geographical data. 
                This data can be anything from geographical boundaries to points of interest. 
                Users can upload their .geojson files, add titles, and manage their uploaded data. 
                The app provides features for viewing and managing uploaded data on an interactive map, 
                making it easy for users to visualize and work with geographical data. 
                With its user-friendly interface and powerful features, the GeoData app 
                aims to simplify the process of working with geographical data for both 
                individuals and organizations.
            </p>
        </div>
    );
};

export default About;
