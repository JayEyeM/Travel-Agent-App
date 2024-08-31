import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, SimpleGrid } from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';
import { newClientFormData } from '../generalUtils/interfaces';

interface SearchClientsProps {
    clientData: newClientFormData[];
    onSearch: (searchTerm: string, filtered: newClientFormData[]) => void;
}

const SearchClients: React.FC<SearchClientsProps> = ({ clientData, onSearch }) => {
    const { primary, secondary, accent } = useBrandColors();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filtered = clientData.filter((client) => {
            return (
                client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.dateCreated.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        onSearch(searchTerm, filtered);
    };

    //view all clients button/function
    const handleViewAll = () => {
        onSearch(searchTerm, clientData);
        setSearchTerm('');
        console.log('View all button clicked');
    }
    
    //handle view invoiced clients
    const handleViewInvoiced = () => {
        const filtered = clientData.filter((client) => client.invoiced === true);
        onSearch(searchTerm, filtered);
        setSearchTerm('true');
    }

    //handle view not invoiced clients
    const handleViewNotInvoiced = () => {
        const filtered = clientData.filter((client) => client.invoiced === false);
        onSearch(searchTerm, filtered);
        setSearchTerm('false');
    }

    // handle view paid clients
    const handleViewPaid = () => {
        const filtered = clientData.filter((client) => client.paid === true);
        onSearch(searchTerm, filtered);
        setSearchTerm('true');
    }

    //handle view unpaid clients
    const handleViewUnpaid = () => {
        const filtered = clientData.filter((client) => client.paid === false);
        onSearch(searchTerm, filtered);
        setSearchTerm('false');
    }

    return (
        <Box>
            <form onSubmit={handleSearchSubmit}>
                <FormControl mt={4} display="flex" flexDirection={{ base: 'column', md: 'row' }}>
                    <FormLabel htmlFor="searchTerm">Search:</FormLabel>
                    <Input
                        id="searchTerm"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder='Search by Name, Email, or Client Creation Date'
                        _placeholder={{ color: accent }}
                        w={{ base: '100%', md: '70%' }}
                    />
                     <Button
                        type="submit"
                        variant={"outline"}
                            outline={"1px solid"}
                            outlineColor={secondary}
                            color={secondary}
                        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                        _hover={{ bg: primary, color: secondary }}
                        _active={{ bg: secondary }}
                        ml={{ base: 0, md: 2 }}
                        mt={{ base: 4, md: 0 }}
                    >
                        Search
                    </Button>
                    
                </FormControl>
                <Box
                    display="flex"
                    flexDirection={{ base: 'column', md: 'column' }}
                    justifyContent={{ base: 'center', md: 'center' }}
                    alignItems={{ base: 'center', md: 'flex-start' }}
                    mt={4}
                    
                >
                    <Text display={{base: 'block', md: 'block'}}
                    w={'100%'}
                    textAlign={'center'}
                    >
                        Or
                    </Text>
                    <SimpleGrid
                        columns={{ base: 2, md: 5 }}
                        spacing={4}
                        w={'100%'}
                        textAlign={'center'}
                        borderBottom={"2px solid"}
                        borderColor={primary}
                        p={{base: 0, md: 2}}
                        pb={{ base: 2, md: 2 }}
                    >
                   
                        <Button
                            type="button"
                            variant={"outline"}
                            outline={"1px solid"}
                            outlineColor={secondary}
                            color={secondary}
                            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                            _hover={{ bg: primary, color: secondary }}
                            _active={{ bg: secondary }}
                            mt={4}
                            
                            onClick={handleViewAll}

                        >
                            View All
                        </Button>
                        <Box display={{base: 'block', md: 'none'}}></Box>
                        <Button
                            type="button"
                            variant={"outline"}
                            outline={"1px solid"}
                            outlineColor={secondary}
                            color={secondary}
                            
                            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                            _hover={{ bg: primary, color: secondary }}
                            _active={{ bg: secondary }}
                            mt={4}
                            
                            onClick={handleViewInvoiced}

                        >
                            Invoiced
                        </Button>

                        <Button
                            type="button"
                            variant={"outline"}
                            outline={"1px solid"}
                            outlineColor={secondary}
                            color={secondary}
                            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                            _hover={{ bg: primary, color: secondary }}
                            _active={{ bg: secondary }}
                            mt={4}
                            
                            onClick={handleViewNotInvoiced}

                        >
                            Not Invoiced
                        </Button>

                        <Button
                            type="button"
                            variant={"outline"}
                            outline={"1px solid"}
                            outlineColor={secondary}
                            color={secondary}
                            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                            _hover={{ bg: primary, color: secondary }}
                            _active={{ bg: secondary }}
                            mt={4}
                            
                            onClick={handleViewPaid}

                        >
                            Paid
                        </Button>

                        
                        <Button
                            type="button"
                            variant={"outline"}
                            outline={"1px solid"}
                            outlineColor={secondary}
                            color={secondary}
                            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                            _hover={{ bg: primary, color: secondary }}
                            _active={{ bg: secondary }}
                            mt={4}
                            
                            onClick={handleViewUnpaid}

                        >
                            Unpaid
                        </Button>


                    </SimpleGrid>
                </Box>
            </form>
        </Box>
    );
};

export default SearchClients;
