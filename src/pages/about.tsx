// src/pages/about.tsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const About: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to the About
      </Heading>
      <Text fontSize="lg">
        This is the About of your application.
      </Text>
    </Box>
  );
};

export default About;
