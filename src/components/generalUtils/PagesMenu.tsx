import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Button, SimpleGrid } from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';
import MenuLink from '../generalUtils/MenuLinks';

interface PagesMenuProps {
    currentPage: string;
}

const PagesMenu: React.FC<PagesMenuProps> = ({ currentPage }) => {
    const { primary, secondary, accent, background, text } = useBrandColors();

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
          <Text color={text} fontSize="lg" fontWeight="bold" mb={4} display={{ base: 'none', md: 'block' }}>
            Menu
          </Text>
          <SimpleGrid
            columns={{ base: 2, md: 1 }}
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
