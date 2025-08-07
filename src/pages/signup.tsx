import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useBrandColors } from '../components/generalUtils/theme';

const Signup = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { primary, background, accent, secondary, text } = useBrandColors();

  const handleSignup = async () => {
    if (!displayName || !email || !password || !confirmPassword) {
      toast({
        title: 'All fields are required.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      toast({
        title: 'Signup failed.',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Check your email to confirm your account.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/signin');
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} borderRadius="lg" bg={background} boxShadow="lg">
      <Heading mb={6} textAlign="center" color={primary}>
        Create an Account
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel color={text}>Display Name</FormLabel>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={text}>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={text}>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={text}>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <Button
          isLoading={loading}
          onClick={handleSignup}
          colorScheme="orange"
          bg={accent}
          color={background}
          width="full"
          mt={4}
        >
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
};

export default Signup;
