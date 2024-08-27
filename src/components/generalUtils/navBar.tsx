// navBar.tsx

import { Box, Button, useColorMode, useTheme, useColorModeValue, Heading } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useBrandColors } from '../generalUtils/theme'


function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode()

    const { background, primary, secondary, accent, text } = useBrandColors()

    return (
        <Box bg={background} m={'auto'} h="auto" w={'100%'} p={4}
        display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Heading color={primary}>TravelAgentApp</Heading>
            
            <Button onClick={toggleColorMode} 
            m={2} 
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;" 
            bg={background}  
            color={text}
            aria-label='Toggle Color Mode'
            _hover={{ bg: accent }}>
                {colorMode === 'light' ?  <SunIcon /> : <MoonIcon />}
            </Button>

           
        </Box>
    )
}

export default NavBar