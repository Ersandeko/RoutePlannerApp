
import { useState, useRef } from 'react';
import {
  Box,
 
  Flex,
  HStack,
  IconButton,

  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { FaLocationArrow } from 'react-icons/fa';
import { useJsApiLoader } from '@react-google-maps/api';
import Map from './Map';
import RouteForm from './RouteForm';

const center = { lat: 42.4304, lng: 19.2594 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyChFRHX-AzTVUsb6PaiCuCS6ZK6Ly4newY',
    libraries: ['places'],
  });

  const [map] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [stops, setStops] = useState([]);

  const originRef = useRef();
  const destiantionRef = useRef();

  const addStop = (position) => {
    setStops([...stops, position]);
  };

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const showRoute = async () => {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    addStop(results.routes[0].legs[0].start_location);
    addStop(results.routes[0].legs[0].end_location);

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
  };

  return (
    <Flex position='relative' flexDirection='column' alignItems='center' h='100vh' w='100vw'>
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        <Map center={center} directionsResponse={directionsResponse} stops={stops} />
      </Box>
      <Box p={4} borderRadius='lg' m={4} bgColor='white' shadow='base' minW='container.md' zIndex='1'>
        <RouteForm
          showRoute={showRoute}
          clearRoute={clearRoute}
          originRef={originRef}
          destiantionRef={destiantionRef}
          addStop={addStop}
        />
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default App;
