import { Box, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import CommisionForm from './commissionForm'
import { useBrandColors } from '../generalUtils/theme'
import DisplayCommissions from './displayCommissions';
import useCommissionsData from './useCommissionsDataHook';
import DataDisplay from '../generalUtils/DataDisplay';
import ClosableBox from '../generalUtils/ClosableBox';

const CommisionCalculator = () => {
    const { primary, background, accent, secondary, text } = useBrandColors()
    
    
    
    
    

  return (
    <Box textAlign={'center'} py={10} px={0} ml={'auto'} mr={'auto'} w={'90%'} borderRadius="lg" bg={background}>
      
      <Heading as="h1" size="xl" mb={4}>
       Commission Management
      </Heading>
      <Text fontSize="lg">
        Add new clients and keep track of them below. Click on a client in the Client List to view more 
        details and use handy tools, such as the Trip Planner and Commission Calculator.
      </Text>
      

      <ClosableBox buttonText='Calculate Commission' 
      title="Commission Calculator" 
      children={<CommisionForm />}
      onClose={() => console.log('Close button clicked')}
      onOpen={() => console.log('Open button clicked')}
       /> 
      
      
      <ClosableBox buttonText='View Commissions' 
      title="Commissions" 
      children={<DisplayCommissions />}
      onClose={() => console.log('Close button clicked')}
      onOpen={() => console.log('Open button clicked')}
       /> 
      
      <Box
        p={4}
        mt={4}
        
      >
        <DataDisplay />
        
        
       
      </Box>

      
    </Box>
  )
}

export default CommisionCalculator
