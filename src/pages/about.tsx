// src/pages/about.tsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useBrandColors } from '../components/generalUtils/theme';

const About: React.FC = () => {
  const { primary, background, accent, secondary, text } = useBrandColors();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        About Globeeta
      </Heading>
      <Text color={secondary} fontSize="lg">
        
        Empowering Travel Agents, One Trip at a Time.
      </Text>
      <Text fontSize="lg" mt={2}>
        
      Globeeta Helps You Streamline Your Clients' Journeys, and Elevate Your Business.
      </Text>

      <Box>
        <Text fontSize="lg" mt={10} color={text}>
          Globeeta is created to help independent travel agents stay organized, efficient, and productive. 
          Our team includes experts with experience in the travel industry, who believe that travel should be simple, 
          efficient, and fun. 
        </Text>
      </Box>
      <Box>
        <Text fontSize="lg" mt={10} color={text}>
          We provide our users with the the tools they need to achieve their goals and serve their clients with exceptional service.
          Choose a plan that fits your business needs, and scale up as your business grows with Globeeta.
        </Text>
      </Box>
    </Box>
  );
};

export default About;
