// src/pages/signout.tsx
import React, { useEffect, useContext, useState } from 'react';
import { Box, Heading, Text, Tooltip, Button, Spinner } from '@chakra-ui/react';
import { useBrandColors } from '../components/generalUtils/theme';
import { AuthContext } from '../components/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../components/generalUtils/APIs';

const Signout: React.FC = () => {
  const { primary, secondary, text } = useBrandColors();
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call backend logout endpoint to clear session cookie
    const logout = async () => {
      try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          credentials: 'include', // important to send cookies
        });

        if (res.ok) {
          setIsLoggedIn(false); // update global auth state
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        setLoading(false);
      }
    };

    logout();
  }, [setIsLoggedIn]);

  if (loading) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Spinner size="xl" />
        <Text mt={4}>Signing you out...</Text>
      </Box>
    );
  }

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Until Next Time!
      </Heading>
      <Text fontSize="lg">Thanks for using Globeeta!</Text>

      <Box mt={10} w={'80%'} ml={'auto'} mr={'auto'} display={'flex'} flexDirection={'column'}>
        <Tooltip
          label="Sign In"
          placement="top"
          hasArrow
          fontSize={'md'}
          bg={secondary}
          color={primary}
          outline="2px solid"
          outlineColor={primary}
        >
          <Button
            as={Link}
            to="/signin"
            w={'175px'}
            ml={'auto'}
            mr={'auto'}
            mt={0}
            color={secondary}
            bg={primary}
            size="lg"
          >
            Sign In
          </Button>
        </Tooltip>

        <Text fontSize="lg" mt={10} color={text}>
          Don't have an account? Just click below to create one.
        </Text>

        <Tooltip
          label="Create Account"
          placement="top"
          hasArrow
          fontSize={'md'}
          bg={secondary}
          color={primary}
          outline="2px solid"
          outlineColor={primary}
        >
          <Button
            as={Link}
            to="/signup"
            w={'175px'}
            ml={'auto'}
            mr={'auto'}
            mt={8}
            color={secondary}
            bg={primary}
            size="lg"
          >
            Create Account
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Signout;
