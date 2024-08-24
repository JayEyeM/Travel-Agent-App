// navBar.tsx

import { Box, Button, useColorMode, useTheme, useColorModeValue, Heading } from '@chakra-ui/react'
import { useBrandColors } from '../generalUtils/theme'


function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode()

    const { brand700, brand900, brand800, brand600 } = useBrandColors()

    return (
        <Box bg={brand900} m={'auto'} h="auto" w={'100%'} p={4} outline={'2px solid'} outlineColor={brand800}
        display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Heading color={brand600}>TravelAgentApp</Heading>

            <Box
                bg={brand700}
                outline="2px solid"
                outlineColor={brand900}
                
                p={4}
                color="white"
                borderRadius="lg"
            >
                Hello
            </Box>
            
            <Button onClick={toggleColorMode} 
            m={2} 
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;" 
            bg={brand900}  
            color={brand600}
            _hover={{ bg: brand700 }}>
                Toggle Theme {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>

           
        </Box>
    )
}

export default NavBar