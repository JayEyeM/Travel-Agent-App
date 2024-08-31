import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';
import { CloseIcon, AddIcon } from '@chakra-ui/icons';

interface ClosableBox3Props {
    title: string;
    buttonText: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    onClose: () => void;
    onOpen: () => void;
    checkboxLabel?: string;
    checkboxLabel2?: string;
    checkboxValue2?: boolean;
    checkboxValue?: boolean;
    onCheckboxValueChange?: (isChecked: boolean) => void;


}

const ClosableBox3: React.FC<ClosableBox3Props> = ({ title, buttonText, icon, children, onClose, onOpen, checkboxLabel, checkboxValue, checkboxValue2, checkboxLabel2, onCheckboxValueChange }) => {
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

    const buttonTextParts = buttonText.split(' | ');

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onCheckboxValueChange) {
            onCheckboxValueChange(event.target.checked);
        }
    };

    const renderCheckbox = () => {
        if (checkboxLabel) {
            return (
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="checkbox" mb="0">
                        {checkboxLabel}
                    </FormLabel>
                    <Checkbox
                        id="checkbox"
                        isChecked={checkboxValue}
                        onChange={handleCheckboxChange}
                        size="lg"
                        borderColor={background}
                        borderRadius={'full'}
                        colorScheme={'green'}
                        bg={'red'}
                    />
                </FormControl>
            );
        }
        return null;
    };
    
    const renderCheckbox2 = () => {
        if (checkboxLabel2) {
            return (
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="checkbox2" mb="0">
                        {checkboxLabel2}
                    </FormLabel>
                    <Checkbox
                        id="checkbox2"
                        isChecked={checkboxValue2}
                        onChange={handleCheckboxChange}
                        size="lg"
                        borderColor={background}
                        borderRadius={'full'}
                        colorScheme={'green'}
                        bg={'red'}
                    />
                </FormControl>
            );
        }
        return null;
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
            flexDirection={{ base: 'column', md: 'column' }}
            justifyContent={{ base: 'center', md: 'left' }}
            alignItems={{ base: 'center', md: 'flex-start' }}
        >

            <Box
               bg={background}
               
               display={'flex'}
               flexDirection={{ base: 'column', md: 'row' }}
               justifyContent={{ base: 'center', md: 'center' }}
               alignItems={{ base: 'center', md: 'flex-start' }}
               w={'100%'}
               > 

            <Button
                bg={secondary}
                color={primary}
                boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                onClick={handleToggle}
                _hover={{ bg: primary, color: accent }}
                _active={{ bg: accent }}
                position="relative"
                mb={2}
                w={'80%'}
                h={'auto'}
                p={2}
                display={'flex'}
                flexDirection={{ base: 'column', md: 'row' }}
            >
                  <Box flex="1" textAlign="left" fontSize={'2xl'} as='b'>
                    {buttonTextParts[0]}
                </Box>
                <Box flex="1" textAlign="center">
                    {buttonTextParts[1]}
                </Box>
                <Box flex="1" textAlign="right">
                    {buttonTextParts[2]} {icon}
                </Box>

            </Button>

            <Box display={'flex'}
            flexDirection={{ base: 'column', md: 'row' }}
            gap={2}
            p={2}
             
            >

                {renderCheckbox()}
                {renderCheckbox2()}

               
                
            </Box>

            </Box>
            
           

            <Box
                id='closable-box-2'
                bg={background}
                boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                borderRadius="lg"
                w={'100%'}
                p={4}
                mt={{ base: 4, md: 0 }}
                ml={'auto'}
                mr={'auto'}
                outline={"2px solid"}
                outlineColor={secondary}
                style={{ display: isVisible ? 'block' : 'none' }} 
            >
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize="xl" fontWeight="bold" color={secondary}>
                        {title}
                    </Text>
                    <Button
                        bg={secondary}
                        color={primary}
                        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                        onClick={handleToggle}
                        _hover={{ bg: primary, color: accent }}
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

export default ClosableBox3;
