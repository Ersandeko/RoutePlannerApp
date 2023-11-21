import { useState } from 'react';
import RouteForm from './RouteForm'
import Map from './Map'
import axios from 'axios';

const App = () => {
  const [directions, setDirections] = useState(null);

  const handleShowRoute = async ({ origin, destination, stops }) => {
    try {
      // Convert addresses to coordinates using Geocoding API
      const originCoords = await getCoordinates(origin);
      const destinationCoords = await getCoordinates(destination);
      const stopCoords = await Promise.all(stops.map((stop) => getCoordinates(stop)));
  
      // Calculate directions using Directions API
      await getDirections(originCoords, destinationCoords, stopCoords);
  
      // Extract routes from the response
      const routes = directions ? directions.routes : null;
  
      // Update state with directions
      setDirections(routes);
    } catch (error) {
      console.error('Error fetching directions:', error);
      // Handle error, show user-friendly message, etc.
    }
  };
  

  const getCoordinates = async (address) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyChFRHX-AzTVUsb6PaiCuCS6ZK6Ly4newY`
    );
    const location = response.data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  };

  const getDirections = async (origin, destination, stops) => {
    const waypoints = stops.map((stop) => ({ location: stop, stopover: true }));

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&waypoints=${waypoints
        .map((waypoint) => `${waypoint.location.lat},${waypoint.location.lng}`)
        .join('|')}&key=AIzaSyChFRHX-AzTVUsb6PaiCuCS6ZK6Ly4newY`
    );

    return response;
  };

  return (
    <div>
      <RouteForm onShowRoute={handleShowRoute} />
      <Map directions={directions} />
    </div>
  );
};

export default App;
