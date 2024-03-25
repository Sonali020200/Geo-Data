import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [geoDataList, setGeoDataList] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    
    if (storedUserId) {
      setUserId(storedUserId);
    }
    fetchGeoData(storedUserId);
  }, []);

  const fetchGeoData = async (id) => {
    const baseURL = `http://localhost:8080/geodata/user?user_id=${id}`;
    try {
      const response = await axios.get(baseURL);
      setGeoDataList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleTitleChange = (e) => setTitle(e.target.value);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file_path', file);
    formData.append('title', title);
    formData.append('user_id', userId);

    try {
      await axios.post('http://localhost:8080/geodata', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if(!userId){
          alert("Please Login")
          return
      }
      alert('File uploaded successfully');
      fetchGeoData();
      setFile(null);
      setTitle("");
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto my-24 p-6 bg-gray-300 rounded-lg shadow-md">
        <h1 className="text-2xl text-center font-bold">Upload a .geojson File</h1><br />
        <form className="flex flex-col gap-4 text-black mb-8" onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
          <input type="file" accept=".geojson" onChange={handleFileChange} />
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300" type="submit">Upload</button>
        </form>
      </div>
      <table className="w-5/6 mx-auto mt-8 border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-900 text-white px-4 py-2">Title</th>
          </tr>
        </thead>
        <tbody>
          {geoDataList.map((data, index) => (
            <tr key={index}>
              <td className="bg-gray-300 text-gray-700 px-4 py-2">{data.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Upload;
