import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Button, SimpleGrid, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useBrandColors } from '../generalUtils/theme';
import MenuLink from '../generalUtils/MenuLinks';

interface NavbarMenuProps {
    currentPage: string;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ currentPage }) => {
    const { primary, secondary, accent, background, text } = useBrandColors();

    return (
        
          
          <Menu>
            <MenuButton as={Button} color={secondary} bg={primary} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}>
                <HamburgerIcon />
            </MenuButton>
            <MenuList>
                <SimpleGrid
                    columns={{ base: 2, md: 1 }}
                    spacing={{ base: 2, md: 4 }}
                    w={'100%'}
                    h={'auto'}
                    justifyItems={{ base: 'center', md: 'center' }}
                    p={2}
                >
                    <MenuLink to="/" texts="Home" isActive={currentPage === 'home'} />
                    <MenuLink to="/learnMore" texts="Learn More" isActive={currentPage === 'learnMore'} />
                    <MenuLink to="/about" texts="About" isActive={currentPage === 'about'} />
                    <MenuLink to="/signin" texts="Sign In" isActive={currentPage === 'signin'} />
                    <MenuLink to="/signout" texts="Sign Out" isActive={currentPage === 'signout'} />
                    <MenuLink to="/policies" texts="Policies" isActive={currentPage === 'policies'} />

                </SimpleGrid>
            </MenuList>
        </Menu>
        
      );
    };
      

export default NavbarMenu;
