import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Button } from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';

interface PagesMenuProps {
    currentPage: string;
}

const PagesMenu: React.FC<PagesMenuProps> = ({ currentPage }) => {
    const { brand900, brand600, brand800, brand700 } = useBrandColors();

    return (
        <Box
            bg={brand900}
            color={brand600}
            p={4}
            borderRadius="lg"
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
            mt={4}
            w={'100%'}
            maxW={'200px'}
            h={'auto'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
                Menu
            </Text>
            <Button
                as={Link}
                to="/"
                variant="link"
                color={currentPage === 'home' ? brand700 : brand800}
                _hover={{ color: brand700 }}
            >
                Home
            </Button>
            <Button
                as={Link}
                to="/calculator"
                variant="link"
                color={currentPage === 'calculator' ? brand700 : brand800}
                _hover={{ color: brand700 }}
            >
                Commission Calculator
            </Button>
            <Button
                as={Link}
                to="/dashboard"
                variant="link"
                color={currentPage === 'dashboard' ? brand700 : brand800}
                _hover={{ color: brand700 }}
            >
                Dashboard
            </Button>
            <Button
                as={Link}
                to="/about"
                variant="link"
                color={currentPage === 'about' ? brand700 : brand800}
                _hover={{ color: brand700 }}
            >
                About
            </Button>
        </Box>
    );
};

export default PagesMenu;
