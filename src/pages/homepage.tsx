// src/pages/Homepage.tsx
import React from 'react';
import { Box, Heading, Text, Tooltip, Button } from '@chakra-ui/react';
import { useBrandColors } from '../components/generalUtils/theme';

const Homepage: React.FC = () => {
  const { primary, background, accent, secondary, text } = useBrandColors()
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
      Welcome to Your Ultimate Commission Tracker
      </Heading>
      <Text fontSize="lg">
        Effortlessly manage your commissions, track bookings, and stay organized—all in one place.
      </Text>

      <Box mt={10} w={'80%'} ml={'auto'} mr={'auto'} display={'flex'} flexDirection={'column'}>
        <Tooltip label="Get Started" placement="top" hasArrow fontSize={'md'} bg={secondary} color={primary} outline="2px solid" outlineColor={primary} >
          <Button w={'175px'} ml={'auto'} mr={'auto'} mt={0} color={secondary} bg={primary} size="lg">
            Get Started
          </Button>
        </Tooltip>

        <Text fontSize="lg" mt={10} color={text}>
          Still want to know more? Just click below to read more details and view screenshots.
        </Text> 

        <Tooltip label="Learn More" placement="top" hasArrow fontSize={'md'} bg={secondary} color={primary} outline="2px solid" outlineColor={primary} >
          <Button w={'175px'} ml={'auto'} mr={'auto'} mt={8} color={secondary} bg={primary} size="lg">
            Learn More
          </Button>
        </Tooltip>

      </Box>
      
    </Box>
    
  );
};

export default Homepage;
