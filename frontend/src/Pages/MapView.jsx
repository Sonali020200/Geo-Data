import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [initialCoordinates, setInitialCoordinates] = useState(null);
  const [mapPoints, setMapPoints] = useState([]);
  const [myData, setMyData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const reverseCoordinates = (arr) => {
    return [arr[1], arr[0]];
  };

  useEffect(() => {
    const selectedCoordinates = myData[selectedData];
    if (selectedCoordinates) {
      const first = reverseCoordinates(selectedCoordinates[0]);
      const map = selectedCoordinates.map((e) => {
        return { location: reverseCoordinates(e) };
      });

      setInitialCoordinates(first);
      setMapPoints(map.map(mp => mp.location)); 
    }
  }, [selectedData, myData]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(' ');
        const userid = localStorage.getItem("userId");
        const data = response.data
          .filter((e) => e.user_id === userid)
          .map((e) => JSON.parse(e.geometry).coordinates[0]);

        setMyData(data);
      } catch (error) {
        console.error('Failed to fetch coordinates:', error);
      }
    };

    fetchCoordinates();
  }, []);

  return (
    <div style={{ marginTop: "100px", textAlign:"center" }}>
      <select onChange={(e) => setSelectedData(e.target.value)}>
        <option value="">Select a point</option>
        {myData.map((_, i) => (
          <option key={i} value={i}>{i + 1}</option>
        ))}
      </select>

      <div style={{ width: "90%", height: "500px",margin:"20px auto" }}>
        {initialCoordinates && (
          <MapContainer center={initialCoordinates} zoom={7} style={{ height: '500px', width: '100%', borderRadius: '10px' }}>
            <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {mapPoints.length > 0 && (
              <Polygon positions={mapPoints} />
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default MapView;
