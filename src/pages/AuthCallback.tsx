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
        // Get the URL hash (everything after #)
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');

        if (!access_token || !refresh_token) {
          console.error('No tokens found in URL hash');
          navigate('/signin'); // fallback redirect
          return;
        }

        // Set the session with Supabase client
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error('Error setting session:', error.message);
          navigate('/signin');
          return;
        }

        // Success - redirect to dashboard or wherever you want
        navigate('/dashboard');
      } catch (err) {
        console.error('Unexpected error:', err);
        navigate('/signin');
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
