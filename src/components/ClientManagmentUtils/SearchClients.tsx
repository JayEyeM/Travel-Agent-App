import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
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
    

    return (
        <Box>
            <form onSubmit={handleSearchSubmit}>
                <FormControl>
                    <FormLabel htmlFor="searchTerm">Search:</FormLabel>
                    <Input
                        id="searchTerm"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder='Search by name, or by the Client Creation Date'
                        _placeholder={{ color: accent }}
                    />
                </FormControl>
                <Box
                    display="flex"
                    flexDirection={{ base: 'column', md: 'row' }}
                    justifyContent={{ base: 'center', md: 'center' }}
                    alignItems={{ base: 'center', md: 'flex-start' }}
                    mt={4}
                >
                    <Button
                        type="submit"
                        bg={secondary}
                        color={primary}
                        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                        _hover={{ bg: primary, color: secondary }}
                        _active={{ bg: secondary }}
                        mt={4}
                        mr={{ base: 0, md: 2 }}
                    >
                        Search
                    </Button>
                    <Button
                        type="submit"
                        bg={secondary}
                        color={primary}
                        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                        _hover={{ bg: primary, color: secondary }}
                        _active={{ bg: secondary }}
                        mt={4}
                        ml={{ base: 0, md: 2 }}
                        onClick={handleViewAll}

                    >
                        View All
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default SearchClients;
