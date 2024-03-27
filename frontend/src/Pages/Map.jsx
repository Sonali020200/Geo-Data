import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [initialCoordinates, setInitialCoordinates] = useState(null);
  const [mapPoints, setMapPoints] = useState([]);
  const [myData, setMyData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const reverseCoordinates = (arr) => {
    if (arr && arr.length >= 2) { 
      return [arr[1], arr[0]];
    } else {
      return null;
    }
  };

  useEffect(() => {
    const selectedCoordinates = myData[selectedData];
    if (selectedCoordinates && Array.isArray(selectedCoordinates)) { 
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
        const response = await axios.get('http://localhost:8080/geodata/list');
        const userid = localStorage.getItem("userId");
        const data = response.data
          .filter((e) => e.user_id === userid)
          .map((e) => JSON.parse(e.geometry).coordinates[0]);
        console.log(data);
        setMyData(data);
      } catch (error) {
        console.error('Failed to fetch coordinates:', error);
      }
    };

    fetchCoordinates();
  }, []);

  return (
    <div className="mt-24 text-center">
      <h1 className="text-2xl text-center font-bold">Select a point to see the mapview.</h1><br /><br />
      <select onChange={(e) => setSelectedData(e.target.value)}>
        <option value="">Select a point</option>
        {myData.map((el, i) => (
          <option key={i} value={el[i]}>{i + 1}</option>
        ))}
      </select>

      <div className="w-11/12 h-96 mx-auto my-4">
        { (
          <MapContainer center={[50,50]} zoom={7} className="h-full w-full rounded">
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

export default Map;
