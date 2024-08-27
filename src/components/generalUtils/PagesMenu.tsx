import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Button, SimpleGrid } from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';

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
            w={'100%'}
            maxW={{ base: '100%', md: '200px' }}
            h={'auto'}
            maxH={{ base: 'auto', md: '500px' }}
            textAlign={{ base: 'center', md: 'left' }}
            
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
                <Button
                    as={Link}
                    to="/"
                    variant="link"
                    color={currentPage === 'home' ? secondary : text}
                    _hover={{ color: secondary }}
                >
                    Home
                </Button>
                <Button
                    as={Link}
                    to="/calculator"
                    variant="link"
                    color={currentPage === 'calculator' ?  secondary : text}
                    _hover={{ color: secondary }}
                >
                    Commission Calculator
                </Button>
                <Button
                    as={Link}
                    to="/dashboard"
                    variant="link"
                    color={currentPage === 'dashboard' ? secondary : text}
                    _hover={{ color: secondary }}
                >
                    Dashboard
                </Button>
                <Button
                    as={Link}
                    to="/projectManagement"
                    variant="link"
                    color={currentPage === 'projectManagement' ? secondary : text}
                    _hover={{ color: secondary }}
                >
                    Project Management
                </Button>
                <Button
                    as={Link}
                    to="/about"
                    variant="link"
                    color={currentPage === 'about' ? secondary : text}
                    _hover={{ color: secondary }}
                >
                    About
                </Button>
            </SimpleGrid>
        </Box>
    );
};

export default PagesMenu;
