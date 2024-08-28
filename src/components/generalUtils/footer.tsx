// footer.tsx
import React from 'react';
import { Box, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import { useBrandColors } from '../generalUtils/theme'

const Footer = () => {

    const { primary, background, accent, secondary, text } = useBrandColors()

  return (
    <Box
    p={4}
    mt={4}
    boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px;'}
    borderRadius="lg"
    bg={primary}
    w={'100%'}
    h={'auto'}
    ml={{ base: 'auto', md: 0 }}
    mr={{ base: 'auto', md: 0 }}
    display={'flex'}
    flexDirection={{ base: 'column', md: 'row' }}
    justifyContent={{ base: 'center', md: 'space-between' }}
    alignItems={{ base: 'center', md: 'flex-start' }}
        
    >
      <Text fontSize="lg" color={text}>
        Globeeta
      </Text>

      <Text fontSize="lg" color={text}>
        All rights reserved &copy; 2023 
      </Text>

      <Text fontSize="lg" color={text}>
        Terms & Conditions
      </Text>

      <Text fontSize="lg" color={text}>
        Privacy Policy
      </Text>

      
    </Box>
  )
}

export default Footer