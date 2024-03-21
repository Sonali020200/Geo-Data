import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/upload.css';

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
      <div className="upload">
        <h2>Upload a .geojson File</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
          <input type="file" accept=".geojson" onChange={handleFileChange} />
          <button className="btn btn1" type="submit">Upload</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {geoDataList.map((data) => (
            <tr key={data.id}>
              <td>{data.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Upload;
