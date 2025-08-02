// File path: TravelAgentApp/src/components/generalUtils/NavbarMenu.tsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useBrandColors } from '../generalUtils/theme';
import MenuLink from '../generalUtils/MenuLinks';
import { AuthContext } from '../context/AuthContext';

interface NavbarMenuProps {
  currentPage: string;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ currentPage }) => {
  const { primary, secondary } = useBrandColors();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Menu>
      <MenuButton as={Button} color={secondary} bg={primary} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;">
        <HamburgerIcon />
      </MenuButton>
      <MenuList>
        <SimpleGrid
          columns={{ base: 2, md: 1 }}
          spacing={{ base: 2, md: 4 }}
          w={'100%'}
          h={'auto'}
          justifyItems={'center'}
          p={2}
        >
          <MenuLink to="/" texts="Home" isActive={currentPage === 'home'} />
          <MenuLink to="/learnMore" texts="Learn More" isActive={currentPage === 'learnMore'} />
          <MenuLink to="/about" texts="About" isActive={currentPage === 'about'} />

          {!isLoggedIn && (
            <MenuLink to="/signin" texts="Sign In" isActive={currentPage === 'signin'} />
          )}

          {isLoggedIn && (
            <MenuLink to="/signout" texts="Sign Out" isActive={currentPage === 'signout'} />
          )}

          <MenuLink to="/policies" texts="Policies" isActive={currentPage === 'policies'} />
        </SimpleGrid>
      </MenuList>
    </Menu>
  );
};

export default NavbarMenu;
