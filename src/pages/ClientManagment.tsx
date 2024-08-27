//  src/pages/ClientManagment.tsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const ClientManagement: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to the Client Management page
      </Heading>
      <Text fontSize="lg">
        This is the Client Management of your application.
      </Text>
    </Box>
  );
};

export default ClientManagement;
