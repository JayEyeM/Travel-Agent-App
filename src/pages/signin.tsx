// src/pages/signin.tsx
import React, { useState, useContext } from 'react';
import {
  Box,
  Heading,
  Text,
  Tooltip,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useBrandColors } from '../components/generalUtils/theme';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from '../components/context/AuthContext';
import { BASE_URL } from '../components/generalUtils/APIs'; // Import BASE_URL from APIs

const Signin: React.FC = () => {
  const { primary, background, accent, secondary, text } = useBrandColors();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSignIn = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      toast({
        title: 'Login failed',
        description: error?.message || 'Something went wrong.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    // Send token to backend to set the session cookie
    const token = data.session.access_token;

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Required for cookie to be accepted
    });

    const result = await res.json();

    if (res.ok) {
      setIsLoggedIn(true); // Update global login state

      toast({
        title: 'Login successful',
        description: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard'); // or wherever your protected route is
    } else {
      toast({
        title: 'Backend login failed',
        description: result.error || 'Failed to set session.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome back!
      </Heading>
      <Text fontSize="lg">
        Fill out your credentials below and click "Sign In" to continue
      </Text>

      <Box mt={10} w={'80%'} maxW="400px" mx="auto" display={'flex'} flexDirection={'column'} gap={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

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
            onClick={handleSignIn}
            w={'175px'}
            mx="auto"
            mt={2}
            color={secondary}
            bg={primary}
            size="lg"
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : 'Sign In'}
          </Button>
        </Tooltip>

        <Text fontSize="lg" mt={6} color={text}>
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
          <Button as={Link} to="/signup" w={'175px'} mx="auto" mt={2} color={secondary} bg={primary} size="lg">
            Create Account
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Signin;
