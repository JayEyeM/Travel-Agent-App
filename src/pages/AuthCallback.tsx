// File: TravelAgentApp/src/pages/AuthCallback.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Spinner, Center, Text } from '@chakra-ui/react';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const paramsFromHash = new URLSearchParams(hash);
        const access_token = paramsFromHash.get('access_token');
        const refresh_token = paramsFromHash.get('refresh_token');

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) throw error;

          navigate('/dashboard');
          return;
        }

        const query = new URLSearchParams(window.location.search);
        const type = query.get('type');
        const token = query.get('token');
        const email = query.get('email'); // 👈 added this

        if (type === 'signup' && token && email) {
          const { error } = await supabase.auth.verifyOtp({
            type: 'signup',
            token,
            email, // 👈 required by Supabase now
          });

          if (error) {
            console.error('Error verifying email:', error.message);
            navigate('/signin');
            return;
          }

          navigate('/signin');
          return;
        }

        console.error('No valid auth data found.');
        navigate('/signin');
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
      <Text mt={4}>Processing authentication...</Text>
    </Center>
  );
};

export default AuthCallback;
