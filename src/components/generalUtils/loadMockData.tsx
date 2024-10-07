// src/components/loadMockData.tsx

import React from 'react';
import { mockData } from './mockData';
import { Button, Text, Box } from '@chakra-ui/react';
import { useBrandColors } from './theme';

const LoadMockData: React.FC = () => {
    const { background, text, secondary, accent, primary } = useBrandColors();
  const loadData = () => {
    localStorage.setItem('ClientList', JSON.stringify(mockData));
    alert('Mock data loaded into local storage!');
  };

  return (
    <Box>
      <Button onClick={loadData} bg={secondary} color={primary} mt={4}>
        Load Mock Data
      </Button>
    </Box>
  );
};

export default LoadMockData;
