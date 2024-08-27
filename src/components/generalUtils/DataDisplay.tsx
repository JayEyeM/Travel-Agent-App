// src/components/generalUtils/DataDisplay.tsx
import React from 'react';
import { Box, Heading, Text,  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup, } from '@chakra-ui/react';
import { useBrandColors } from './theme';

const DataDisplay: React.FC = () => {
  const { primary, background, accent, secondary, text } = useBrandColors()
  return (
    <Box textAlign="center" py={10} px={6}>
      <Text fontSize="lg">
        {/* //Make these dynamic */}
        //Make these dynamic
        </Text>
     
      <StatGroup mt={4}>
        <Stat>
          <StatLabel>Paid</StatLabel>
          <StatNumber color={'green.300'}>4</StatNumber>
          <StatHelpText>
            <StatArrow color={'green.300'} type='increase' />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Partially Paid</StatLabel>
          <StatNumber color={secondary}>5</StatNumber>
          <StatHelpText>
            9.05%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Un-paid</StatLabel>
          <StatNumber color={'red.300'}>2</StatNumber>
          <StatHelpText>
            <StatArrow color={'red.300'} type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <Box mt={10} w={'80%'} ml={'auto'} mr={'auto'} textAlign={{ base: 'center', md: 'right' }}>
        <Stat>
          <StatLabel>Collected Fees</StatLabel>
          <StatNumber color={'green.300'}>$0.00</StatNumber>
          <StatHelpText>Feb 12 - Feb 28</StatHelpText>
        </Stat>
      </Box>
    </Box>
  );
};

export default DataDisplay;
