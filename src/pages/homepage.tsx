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

      <Tooltip label="Coming Soon" placement="top" hasArrow fontSize={'md'} bg={secondary} color={primary} outline="2px solid" outlineColor={primary} >
        <Button mt={8} color={secondary} bg={primary} size="lg">
          Get Started
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Homepage;
