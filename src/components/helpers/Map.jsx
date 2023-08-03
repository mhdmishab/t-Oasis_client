import React, { useEffect, useState } from 'react';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, useControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;


function Map({ lat, setLat, lng, setLng, updatePlaceName }) {


  const [defaultLocation, setDefaultLocation] = useState('');

  useEffect(() => {
    // Retrieve user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Set default location as latitude and longitude
          setDefaultLocation(`${latitude},${longitude}`);
          
        }
        
        ,
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);





  const Geocoder = () => {
    const ctrl = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      collapsed: true,
    });
    useControl(() => ctrl);
    ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates;
      setLng(coords[0]);
      setLat(coords[1]);
    });
    return null;
  };
  
  

  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await 
      // fetch(
      //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoidG9hc2lzIiwiYSI6ImNsaXR0cWFmYzA4ZnUzbG8ycHZkZjJ6YWYifQ.Es8eobMW0-oa_Gr1jY7pGA`,{
      //     mode: "no-cors"
      //     }
      fetch("https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=%27pk.eyJ1IjoidG9hc2lzIiwiYSI6ImNsaXR0cWFmYzA4ZnUzbG8ycHZkZjJ6YWYifQ.Es8eobMW0-oa_Gr1jY7pGA%27", {
mode: "no-cors"
})

        .catch(err=>console.log(err))
      const data = await response.json();
      const placeName = data.features[0].place_name;
      console.log('Place Name:', placeName);
      updatePlaceName(placeName); 
    } catch (error) {
      console.error('Error retrieving place name:', error);
    }
  };

  return (
    <ReactMapGL
      mapboxApiAccessToken={mapboxgl.accessToken}
      width="100%"
      height="400px"
      latitude={lat}
      longitude={lng}
      zoom={6}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(viewport) => {
        setLat(viewport.latitude);
        setLng(viewport.longitude);
      }}
    >
      <Marker
        latitude={lat}
        longitude={lng}
        draggable
        onDragEnd={(e) => {
          console.log(e.lngLat.lat);
          console.log(e.lngLat.lng);
          setLat(e.lngLat.lat);
          setLng(e.lngLat.lng);
          getPlaceName(e.lngLat.lat, e.lngLat.lng);
        }}
      />
      <NavigationControl position="bottom-right" />
      <GeolocateControl
        position="top-left"
        trackUserLocation
        onGeolocate={(e) => {
          setLat(e.coords.latitude);
          setLng(e.coords.longitude);
          getPlaceName(e.coords.latitude, e.coords.longitude);
        }}
      />
      <Geocoder />
    </ReactMapGL>
  );
}

export default Map;