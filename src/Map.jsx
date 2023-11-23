

import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const Map = ({ center, directionsResponse, stops }) => {
  return (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: '100%', height: '100%' }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      <Marker position={center} label="C" />

      {stops.map((stop, index) => (
        <Marker key={index} position={stop} label={(index + 1).toString()} />
      ))}

      {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
    </GoogleMap>
  );
};

export default Map;
