import React, {useEffect, useState } from 'react'
import axios from 'axios';

const GeoLocationComponent  = () => {

const [location, setLocation] = useState({
     latitude: null,
     longitude: null,
     state: null,
     error: null,
});
useEffect(() => {
     if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(
               (position)=> {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude }) ;
                    getStateFromLatLong(latitude, longitude);
               },
               (error) => {
                    setLocation({ ...location, error: error.message });
               }
          );
     } else {
          setLocation({ ...location, error: "Geolocation is not supported by this browser."});
     }
}, []);

const getStateFromLatLong = async (lat, long) => {
     try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`
          );
          const data = await response.json();
          const state = data.address.state;
          setLocation((prevState) => ({ ...prevState, state }));
     } catch (error) {
          setLocation((prevState) => ({...prevState, error: "Unable to retrieve state"}));
     }
};



  return (
    <div>
      {location.error ? (
          <p>Error :{location.error}</p>
      ) : (
        <div>
          <h3>Your Location </h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>State: {location.state}</p>
          </div>
      )}
    </div>
  )
}

export default GeoLocationComponent 
