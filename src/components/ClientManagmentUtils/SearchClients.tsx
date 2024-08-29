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
                client.bookingNumber.toString().includes(searchTerm) ||
                client.dateCreated.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        onSearch(searchTerm, filtered);
    };

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
                        placeholder="Search by name, booking number, or creation date"
                        _placeholder={{ color: accent }}
                    />
                </FormControl>
                <Button
                    type="submit"
                    bg={secondary}
                    color={primary}
                    boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                    _hover={{ bg: primary, color: secondary }}
                    _active={{ bg: secondary }}
                    mt={4}
                >
                    Search
                </Button>
            </form>
        </Box>
    );
};

export default SearchClients;
