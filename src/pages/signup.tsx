// src/pages/signup.tsx
import React from 'react';
import { Box, Heading, Text, Tooltip, Button } from '@chakra-ui/react';
import { useBrandColors } from '../components/generalUtils/theme';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const { primary, background, accent, secondary, text } = useBrandColors()
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
      Welcome to the Travel Agent App that helps you track your commissions and more!
      </Heading>
      <Text fontSize="lg">
        Fill out the form below and click "Create My Account" to get started.
      </Text>

      <Box mt={10} w={'80%'} ml={'auto'} mr={'auto'} display={'flex'} flexDirection={'column'}>
        <Tooltip label="Create My Account" placement="top" hasArrow fontSize={'md'} bg={secondary} color={primary} outline="2px solid" outlineColor={primary} >
          <Button w={'175px'} ml={'auto'} mr={'auto'} mt={0} color={secondary} bg={primary} size="lg">
            Create My Account
          </Button>
        </Tooltip>

        <Text fontSize="lg" mt={10} color={text}>
          Already have an account? Just click below to sign in.
        </Text> 

        <Tooltip label="Sign In" placement="top" hasArrow fontSize={'md'} bg={secondary} color={primary} outline="2px solid" outlineColor={primary} >
          <Button as={Link} to="/signin" w={'175px'} ml={'auto'} mr={'auto'} mt={8} color={secondary} bg={primary} size="lg">
            Sign In
          </Button>
        </Tooltip>

      </Box>
      
    </Box>
    
  );
};

export default Signup;
