import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import CommissionRateAmountDataDisplay from '../components/generalUtils/CommissionRateAmountDataDisplay';
import LocalStorageDisplay from '../components/DashboardUtils/ExportableDataTables';


const Dashboard: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Overview
      </Heading>
      <CommissionRateAmountDataDisplay />
      <Box mt={4}>
      <LocalStorageDisplay />
      </Box>
     
    </Box>
  );
};

export default Dashboard;
