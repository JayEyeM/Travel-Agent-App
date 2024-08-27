// navBar.tsx

import { Box, Button, useColorMode, useTheme, useColorModeValue, Heading } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useBrandColors } from '../generalUtils/theme'
import NavbarMenu from './NavbarMenu'
import Logo from './Logo'


function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode()

    const { background, primary, secondary, accent, text } = useBrandColors()

    const getCurrentPage = () => {
        switch (location.pathname) {
          case '/':
            return 'home';
          case '/about':
            return 'about';
          default:
            return '';
        }
      };

    return (
        <Box bg={background} m={'auto'} h="auto" w={'100%'} p={4}
        display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

            <Logo width='auto' height='75' />
            <Heading as={'h1'} fontSize={'6xl'} fontFamily={['Raleway Heavy', 'sans-serif']}   color={accent}>Globeeta</Heading>

            <Box display={'flex'} alignItems={'center'}>
            
                <Button onClick={toggleColorMode} 
                m={2} 
                boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;" 
                bg={primary} 
                color={secondary}
                aria-label='Toggle Color Mode'
                _hover={{ bg: background }}>
                    {colorMode === 'light' ?  <SunIcon /> : <MoonIcon />}
                </Button>

                <NavbarMenu currentPage={getCurrentPage()} />

            </Box>
           
        </Box>
    )
}

export default NavBar