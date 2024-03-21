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
        const response = await axios.get('http://localhost:8080/geodata/list');
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



// import React from "react";
// import { MapContainer, Marker,  TileLayer, GeoJSON } from "react-leaflet";
// import "../Styles/MapView";
// import "leaflet/dist/leaflet.css";
// import icon from "./image/pointer.png";
// import L from "leaflet";
// import { useState } from "react";
// import mapPolygon from "./data/polygon.json";
// // import { useEffect } from "react";
// import Button from "@mui/material/Button";
// const Map = () => {
//   // if use false so in the ui shift to all map in pre showing  if true if showing on starting 
//   const [activeArea, setActiveArea] = useState(true);
//   // const [activeArea, setActiveArea] = [true, true]
//   // const [activeArea, setActiveArea] = useState(false);
//   // const [clickedPosition, setClickedPosition] = useState(null);
//   const position =  [
//     75.87395615029814,
//     28.245781509532634
//   ]
//   const position2 =  [
//     88.4372281429201,
//     22.41729560992114
//   ]
//   const position3 =  [
//     78.23589040830103,
//     20.812312458903136
//   ]
//   console.log(mapPolygon);
//   const placeStyle = {
//     fillColor: "orange",
//     color: "green",
//   };
//   const markerIcon = new L.icon({
//     iconUrl: icon,
//     iconSize: [35, 45],
//     iconAnchor: [17, 45],
//   });
//   const interactionOption = {
//     zoomControl: true,
//     doubleClickZoom: true,
//     dragging: true,
//     zoomSnap: true,
//     zoomDelta: true,
//     trackResize: true,
//     touchZoom: true,
//     scrollWheelZoom: true,
//   };
//   // const handleMapClick = (event) => {
//   //   setClickedPosition(event.latlng); // Update clicked position
//   // };
//   return (
//     <div className="main-div">
//       <div className="default-map">
//         <MapContainer
//           className="map-container"
//           center={position}
//           zoom={3}
//           scrollWheelZoom={true}
//           // onClick={handleMapClick} 
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=iTsPaDR57nskqMELIEgC"
//           />
//           {activeArea &&   (
//             <div>
//               {/* <Marker position={position} icon={markerIcon}></Marker> */}
//               <Marker position={position2} icon={markerIcon}></Marker>
//               <GeoJSON style={placeStyle} data={mapPolygon.features} />
//             </div>
//           )}
//         </MapContainer>
//       </div>
//       <div className="image-div">
//         <div style={{ marginBottom: "10px" }}>
//           <Button
//             onClick={() => {
//               setActiveArea(!activeArea);
//             }}
//             variant="contained"
//           >
//             {activeArea === false ? "See Desired Area" : "Default Map"}
//           </Button>
//         </div>
//         {activeArea ? (
//           <div className="photo">
//             <MapContainer
//               className="map-photo"
//               center={position}
//               zoom={14}
//               scrollWheelZoom={true}
//               {...interactionOption}
//             >
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=iTsPaDR57nskqMELIEgC"
//               />
//               {activeArea && (
//                 <div>
//                   {/* <Marker position={position} icon={markerIcon}></Marker> */}
//                   <Marker position={position2} icon={markerIcon}></Marker>
//                 </div>
//               )}
//               { <GeoJSON style={placeStyle} data={mapPolygon.features} /> }
//             </MapContainer>
//           </div>
//         ) : (
//           <h2>Select Area to See</h2>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Map;