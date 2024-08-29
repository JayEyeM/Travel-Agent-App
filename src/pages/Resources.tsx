// Resources.tsx
import React from 'react';
import { Box, Heading, Text, Tooltip, Button } from '@chakra-ui/react';
import { useBrandColors } from '../components/generalUtils/theme';
import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
    const { primary, background, accent, secondary, text } = useBrandColors();
    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h1" size="xl" mb={4}>
                Resources
            </Heading>
            <Text fontSize="lg">    
                Welcome to the Resources page of your application. 
            </Text>

            <Box mt={10} w={'80%'} ml={'auto'} mr={'auto'} display={'flex'} flexDirection={'column'}>
                

                <Text fontSize="lg" mt={10} color={text}>
                    Click one of the links below to discover useful resources.
                </Text>

                <Tooltip label="Resource 1" placement="top" hasArrow fontSize={'md'} bg={secondary} color={primary} outline="2px solid" outlineColor={primary} >
                    <Button w={'175px'} ml={'auto'} mr={'auto'} mt={8} color={secondary} bg={primary} size="lg">
                       Resource 1
                    </Button>
                </Tooltip>

                <Tooltip label="Resource 2" placement="top" hasArrow fontSize={'md'} bg={secondary} color={primary} outline="2px solid" outlineColor={primary} >
                    <Button w={'175px'} ml={'auto'} mr={'auto'} mt={8} color={secondary} bg={primary} size="lg">
                        Resource 2
                    </Button>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Resources;