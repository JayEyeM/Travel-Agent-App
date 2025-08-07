// File path: TravelAgentApp/src/pages/AuthCallback.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; 
import { Spinner, Center, Text } from '@chakra-ui/react';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          console.error('No code found in URL');
          return;
        }

        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          console.error('Error exchanging code:', error.message);
        } else {
          console.log('Session exchanged:', data);
          navigate('/dashboard'); // redirect after successful login
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <Center height="100vh" flexDirection="column">
      <Spinner size="xl" />
      <Text mt={4}>Completing sign in...</Text>
    </Center>
  );
};

export default AuthCallback;

