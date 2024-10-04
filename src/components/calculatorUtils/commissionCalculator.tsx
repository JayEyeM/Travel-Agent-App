import { Box, Text, Heading, useColorModeValue, List, ListItem} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import CommisionForm from './commissionForm'
import { useBrandColors } from '../generalUtils/theme'
import DisplayCommissions from './displayCommissions';
import useCommissionsData from './useCommissionsDataHook';
import CommissionRateAmountDataDisplay from '../generalUtils/CommissionRateAmountDataDisplay';
import ClosableBox from '../generalUtils/ClosableBox';


const CommisionCalculator = () => {
    const { primary, background, accent, secondary, text } = useBrandColors()
    
    
    
    
    

  return (
    <Box textAlign={'center'} py={10} px={0} ml={'auto'} mr={'auto'} w={'90%'} borderRadius="lg" bg={background}>
      
      <Heading as="h1" size="xl" mb={4}>
       Commission Management
      </Heading>
      <ClosableBox
      boxShadow= {false}
      icon={<InfoIcon h={5} w={5} />}
      title='How to use the Commission Calculator'
      children={
        <List spacing={3} styleType="disc" pl={4} textAlign={'left'}>
                <ListItem>
                    Choose a client name, a booking, and confirmation number/supplier.
                </ListItem>
                <ListItem>
                    Then enter the commission rate percentage and commission amount to calculate the amount of your commission rate.
                </ListItem>
                <ListItem>
                    Mark the commission as invoiced and/or paid, followed by the payment date. Submit the details to view/edit the Commission Card 
                    in the "View Commissions" section.
                </ListItem>
            </List>
      }
      onClose={() => console.log('Close button clicked')}
      onOpen={() => console.log('Open button clicked')}
      />
      

      <ClosableBox buttonText='Calculate Commission' 
      title="Commission Calculator" 
      children={<CommisionForm />}
      onClose={() => console.log('Close button clicked')}
      onOpen={() => console.log('Open button clicked')}
      boxShadow= {false}
       /> 
      
      
      <ClosableBox buttonText='View Commissions' 
      title="Commission Cards" 
      children={<DisplayCommissions />}
      onClose={() => console.log('Close button clicked')}
      onOpen={() => console.log('Open button clicked')}
      boxShadow= {false}
       /> 
      
      <Box
        p={4}
        mt={4}
        
      >
        <CommissionRateAmountDataDisplay />
        
        
       
      </Box>

      
    </Box>
  )
}

export default CommisionCalculator
