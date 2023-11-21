import React from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const Map = ({ origin, destination, stops = [], directions = [] }) => {
  const centerLat = stops.length > 0 ? stops.reduce((sum, stop) => sum + stop.lat, 0) / stops.length : 42.4304;
  const centerLng = stops.length > 0 ? stops.reduce((sum, stop) => sum + stop.lng, 0) / stops.length : 19.2594;

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyChFRHX-AzTVUsb6PaiCuCS6ZK6Ly4newY">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={{ lat: centerLat, lng: centerLng }}>
        <Marker position={origin} />
        <Marker position={destination} />
        {stops.map((stop, index) => (
          <Marker key={index} position={stop} />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
