import React, { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';
import { CloseIcon, AddIcon } from '@chakra-ui/icons';

interface ClosableBoxProps {
    title: string;
    buttonText: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    onClose: () => void;
    onOpen: () => void;
}

const ClosableBox: React.FC<ClosableBoxProps> = ({ title, buttonText, icon, children, onClose, onOpen }) => {
    const { primary, background, secondary, accent, text } = useBrandColors();
    const [isVisible, setIsVisible] = useState(false);

    const handleToggle = () => {
        setIsVisible(!isVisible);
        if (isVisible) {
            onClose();
        } else {
            onOpen();
        }
    };

    return (
        <Box
            bg={background}
            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
            borderRadius="lg"
            p={4}
            mt={4}
            position="relative"
            minW={'200px'}
            maxW={'100%'}
            w={'auto'}

            ml={{ base: 'auto', md: 0 }}
            mr={{ base: 'auto', md: 0 }}
            display={'flex'}
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent={{ base: 'center', md: 'left' }}
            alignItems={{ base: 'center', md: 'flex-start' }}
        >
            <Button
                bg={primary}
                color={secondary}
                boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                onClick={handleToggle}
                _hover={{ bg: accent, color: primary }}
                _active={{ bg: accent }}
                position="relative"
                
            >
                 {buttonText}&nbsp;{icon}
            </Button>
            <Box
                id='closable-box'
                bg={background}
                boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                borderRadius="lg"
                w={'100%'}
                p={4}
                mt={{ base: 4, md: 0 }}
                ml={2}
                outline={"2px solid"}
                outlineColor={secondary}
                style={{ display: isVisible ? 'block' : 'none' }} 
            >
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize="xl" fontWeight="bold" color={accent}>
                        {title}
                    </Text>
                    <Button
                        bg={primary}
                        color={secondary}
                        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                        onClick={handleToggle}
                        _hover={{ bg: accent, color: primary }}
                        _active={{ bg: accent }}
                        position="relative"
                    >
                        <CloseIcon />
                    </Button>
                </Box>
                {children}
            </Box>
        </Box>
    );
};

export default ClosableBox;
