import { useState } from 'react';

const RouteForm = ({ onAddStop, onShowRoute }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [stops, setStops] = useState([]);

  const handleAddStop = () => {
    if (stops.length < 10) {
      setStops([...stops, '']);
    }
  };

  const handleInputChange = (index, value) => {
    const updatedStops = [...stops];
    updatedStops[index] = value;
    setStops(updatedStops);
  };

  const handleShowRoute = () => {
    onShowRoute({ origin, destination, stops });
  };

  return (
    <div>
      <label htmlFor="origin">Origin:</label>
      <input
        type="text"
        id="origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />

      <label htmlFor="destination">Destination:</label>
      <input
        type="text"
        id="destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      {stops.map((stop, index) => (
        <div key={index}>
          <label htmlFor={`stop-${index + 1}`}>{`Stop ${index + 1}:`}</label>
          <input
            type="text"
            id={`stop-${index + 1}`}
            value={stop}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleAddStop}>Add Stop</button>
      <button onClick={handleShowRoute}>Show Route</button>
    </div>
  );
};

export default RouteForm;
