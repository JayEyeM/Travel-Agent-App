// File path: TravelAgentApp/src/components/generalUtils/PagesMenu.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Button, SimpleGrid, useColorMode, Center } from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';
import MenuLink from '../generalUtils/MenuLinks';
import { supabase } from '../../lib/supabaseClient';
import theme from './theme';

interface PagesMenuProps {
    currentPage: string;
}

const PagesMenu: React.FC<PagesMenuProps> = ({ currentPage }) => {
    const { primary, secondary, accent, background, text } = useBrandColors();
  const [displayName, setDisplayName] = useState<string | null>(null);

  const { colorMode } = useColorMode();
const accentHex = colorMode === 'dark'
  ? theme.colors.brand.Accent.dark
  : theme.colors.brand.Accent.light;
const textHex = colorMode === 'dark'
  ? theme.colors.brand.Background.dark
  : theme.colors.brand.Background.light;

  useEffect(() => {
  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const name = user.user_metadata?.displayName || user.user_metadata?.full_name || user.email;
      setDisplayName(name);
    }
  };

  getUser();
}, []);


    return (
        <Box
          bg={background}
          color={primary}
          p={2}
          borderRadius="lg"
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
          minW={{ base: '90%', md: '200px' }}
          w={{ base: '90%', md: '100%' }}
          maxW={{ base: '100%', md: '200px' }}
          h={'auto'}
          maxH={{ base: 'auto', md: '500px' }}
          textAlign={{ base: 'center', md: 'left' }}
          mb={{ base: 4, md: 0 }}
          ml={{ base: 'auto', md: 0 }}
          mr={{ base: 'auto', md: 0 }}
        >
          
          {displayName && (
            <Box mb={4} p={2}  textAlign={"left"} w="100%" display={{ base: 'block', md: 'block' }}
            borderBottom={`2px solid ${accentHex}`}
            >
            <Text color={text}  borderRadius={5} fontSize="xl" fontWeight="bold" p={1} mb={1} display={{ base: 'block', md: 'block' }}>
               {displayName}
            </Text>
            </Box>
          )}
          

          <SimpleGrid
            columns={{ base: 1, md: 1 }}
            spacing={{ base: 2, md: 4 }}
            w={'100%'}
            h={'auto'}
            justifyItems={{ base: 'center', md: 'left' }}
            p={2}
          >
            
            <MenuLink to="/dashboard" texts="Dashboard" isActive={currentPage === 'dashboard'} />
            <MenuLink to="/clientManagement" texts="Client Management" isActive={currentPage === 'clientManagement'} />
            <MenuLink to="/bookingManagement" texts="Booking Management" isActive={currentPage === 'bookingManagement'} />
            <MenuLink to="/calculator" texts="Commission Calculator" isActive={currentPage === 'calculator'} />
            <MenuLink to="/todoNotes" texts="To Do List" isActive={currentPage === 'todoNotes'} />
            <MenuLink to="/resources" texts="Resources" isActive={currentPage === 'resources'} />
            

            <MenuLink to="/aiAssistance" texts="AI Assistant" isActive={currentPage === 'aiAssistance'} />
            
            
            
          </SimpleGrid>
        </Box>
      );
    };
      

export default PagesMenu;
