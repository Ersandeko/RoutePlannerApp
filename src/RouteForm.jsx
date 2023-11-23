
import { useRef, useState } from 'react';
import {
  Input,
  HStack,
  Button,
  IconButton,
  ButtonGroup,
  VStack,
} from '@chakra-ui/react';
import { Autocomplete } from '@react-google-maps/api';
import { FaTimes } from 'react-icons/fa';

const RouteForm = ({ showRoute, clearRoute, originRef, destiantionRef, addStop }) => {
  const [stops, setStops] = useState([]);

  const handleAddStop = () => {
    addStop('');
    setStops([...stops, '']);
  };

  const updateStop = (index, value) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const removeStop = (index) => {
    const newStops = [...stops];
    newStops.splice(index, 1);
    setStops(newStops);
  };

  return (
    <VStack spacing={4} alignItems='stretch'>
      <HStack spacing={2} justifyContent='space-between'>
        <Autocomplete>
          <Input type='text' placeholder='Origin' ref={originRef} />
        </Autocomplete>
        <Autocomplete>
          <Input type='text' placeholder='Destination' ref={destiantionRef} />
        </Autocomplete>

        <ButtonGroup>
          <Button colorScheme='pink' type='submit' onClick={showRoute}>
            Show Route
          </Button>
          <IconButton aria-label='center back' icon={<FaTimes />} onClick={clearRoute} />
        </ButtonGroup>
      </HStack>

      {stops.map((stop, index) => (
        <HStack key={index} spacing={2} justifyContent='space-between'>
          <Autocomplete>
            <Input
              type='text'
              placeholder={`Stop ${index + 1}`}
              value={stop}
              onChange={(e) => updateStop(index, e.target.value)}
            />
          </Autocomplete>
          <IconButton
            aria-label={`remove stop ${index + 1}`}
            icon={<FaTimes />}
            onClick={() => removeStop(index)}
          />
        </HStack>
      ))}

      <Button colorScheme='teal' onClick={handleAddStop}>
        Add Stop
      </Button>
    </VStack>
  );
};

export default RouteForm;
