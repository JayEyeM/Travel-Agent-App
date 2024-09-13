import { Box, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import CommisionForm from './commissionForm'
import { useBrandColors } from '../generalUtils/theme'
import DisplayCommissions from './displayCommissions';
import useCommissionsData from './useCommissionsDataHook';

const CommisionCalculator = () => {
    const { primary, background, accent, secondary, text } = useBrandColors()
    const { commissions } = useCommissionsData();
    const [totalCommissionRateAmount, setTotalCommissionRateAmount] = useState(0);
    
    useEffect(() => {
      const total = commissions.reduce((acc, commission) => acc + commission.commissionRateAmount, 0);
      setTotalCommissionRateAmount(total);
    }, [commissions]);
    
    
    
    

  return (
    <Box p={0} ml={'auto'} mr={'auto'} w={'90%'} borderRadius="lg" bg={background}>
      <Box
        p={4}
        mt={0}
        outline="2px solid"
        outlineColor="white"
        borderRadius="lg"
        bg={background}
      >
        <Heading>Commision Calculator</Heading>
        <Text fontSize="lg" color={text}>
          Fill in the form to calculate your commission
        </Text>
      </Box>
      <CommisionForm />
      <DisplayCommissions />
      <Box
        p={4}
        mt={4}
        outline="2px solid"
        outlineColor="white"
        borderRadius="lg"
        bg={background}
      >
        <Text fontSize="lg" color={accent}>
        Total Commission Rate Amount: <Text as="b" fontSize={"xl"} color={secondary}>${totalCommissionRateAmount.toFixed(2)}</Text>
        </Text>
        
       
      </Box>

      
    </Box>
  )
}

export default CommisionCalculator
