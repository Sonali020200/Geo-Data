import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-center mb-6">About GeoData App</h1>
      <p className="text-lg mb-4">
        The GeoData app is a platform for users to upload and manage .geojson files containing geographical data. This data can be anything from geographical boundaries to points of interest. Users can upload their .geojson files, add titles, and manage their uploaded data.
      </p>
      <p className="text-lg mb-4">
        The app provides features for viewing and managing uploaded data on an interactive map, making it easy for users to visualize and work with geographical data. With its user-friendly interface and powerful features, the GeoData app aims to simplify the process of working with geographical data for both individuals and organizations.
      </p>
      <p className="text-lg mb-4"> With its user-friendly interface and powerful features, the GeoData app aims to simplify the process of working with geographical data for both individuals and organizations.
      </p>
      <p className="text-lg mb-4">
        Whether you're a researcher, a GIS professional, or someone interested in exploring geographical data, GeoData offers a comprehensive solution for managing, visualizing, and collaborating on spatial datasets. Start exploring the world of geographical data with GeoData today!
      </p>
    </div>
  );
};

export default About;
