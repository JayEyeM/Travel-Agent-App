// src/pages/Polcies.tsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useBrandColors } from '../components/generalUtils/theme';

const Policies: React.FC = () => {
  const { primary, background, accent, secondary, text } = useBrandColors();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Policies
      </Heading>
      <Text color={secondary} fontSize="lg">
        
        Empowering Travel Agents, One Trip at a Time.
      </Text>
      <Text fontSize="lg" mt={2}>
        
      This will be the policies page.
      </Text>

      <Box>
        <Text fontSize="lg" mt={10} color={text}>
          Policies placeholder
        </Text>
      </Box>
      <Box>
        <Text fontSize="lg" mt={10} color={text}>
          Policies placeholder
        </Text>
      </Box>
    </Box>
  );
};

export default Policies;
