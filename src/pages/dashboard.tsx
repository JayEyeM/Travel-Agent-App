import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import DataDisplay from '../components/generalUtils/DataDisplay';


const Dashboard: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Overview
      </Heading>
      <DataDisplay />
     
    </Box>
  );
};

export default Dashboard;
