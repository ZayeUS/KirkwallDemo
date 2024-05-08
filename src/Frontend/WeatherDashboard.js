import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../Backend/graphql_helper'; // Adjust the import path as needed
import {
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Box,
  Container,
  SimpleGrid
} from '@chakra-ui/react';

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');

    let isoDate = "";
    let cstTime = '';

  useEffect(() => {
    getWeatherData()
      .then(data => {
        console.log('this is data', data);
        setWeatherData(data.data.weather_data);
      })
      .catch(err => {
        console.error('Failed to fetch weather data:', err);
        setError('Failed to fetch data');
      });
  }, []);

  return (
    <Box as="section" py={{ base: '4', md: '8' }}>
      <Container maxW="container.xl">
        <h1>Weather Dashboard</h1>
        {error && <p>{error}</p>}
        {weatherData.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap="6"
            p="6"
            bg="bg.surface"
            borderRadius="lg"
            boxShadow="md"
          >
            {weatherData.map((data, index) => (
              <StatGroup key={index} bg="gray.50" p="4" borderRadius="md" boxShadow="base">
                
                <Stat>
                  <StatLabel>Station Name</StatLabel>
                  <StatNumber>{data.station.name}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Temperature</StatLabel>
                  <StatNumber>{data.temperature}°C</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Timestamp</StatLabel>
                  <StatNumber> {cstTime = convertToCST(data.message_timestamp)}</StatNumber>
                </Stat>
              </StatGroup>
            ))}
          </SimpleGrid>
        ) : (
          <p>Loading data...</p>
        )}
      </Container>
    </Box>
  );
}

function convertToCST(isoString) {
    // Parse the ISO string into a Date object
    const date = new Date(isoString);

    // Define options for formatting
    const options = {
        timeZone: 'America/Chicago',  // CST/CDT depending on daylight saving
        hour: 'numeric',
        minute: 'numeric',
        hour12: true  // Use 12-hour format
    };

    // Create an Intl.DateTimeFormat instance with desired options
    const formatter = new Intl.DateTimeFormat('en-US', options);

    // Format the date according to the specified timezone
    return formatter.format(date);
}

export default WeatherDashboard;
