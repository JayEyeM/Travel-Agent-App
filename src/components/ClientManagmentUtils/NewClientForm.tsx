import React, { useState } from 'react';
import {
    Box,
    Divider,
    AbsoluteCenter,
    Text,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    SimpleGrid,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { useBrandColors } from '../generalUtils/theme';
import dayjs from 'dayjs';
import { newClientFormData } from '../generalUtils/interfaces';
import { postData } from '../generalUtils/APIs';
import useClientData from './UseClientDataHook';

// Generate unique ID
const generateUniqueId = () => {
    const clientList = localStorage.getItem('ClientList');
    if (clientList === null || clientList === '') {
        return 1;
    } else {
        const clients = JSON.parse(clientList);
        if (clients.length === 0) {
            return 1;
        } else {
            const highestId = Math.max(...clients.map((client: newClientFormData) => client.id));
            return highestId + 1;
        }
    }
}

const NewClientForm: React.FC = () => {
    const { primary, background, secondary } = useBrandColors();

    // Initialize state with the newClientFormData interface
    const [formData, setFormData] = useState<newClientFormData>({
        id: generateUniqueId(),
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientPostalCode: '',
        clientStreetAddress: '',
        clientCity: '',
        clientProvince: '',
        clientCountry: '',
        notes: '',
        invoiced: false,
        paid: false,
        paymentDate: '',
        finalPaymentDate: '',
        dateCreated: dayjs().format('YYYY-MM-DD'),
        bookings: [],
    });

    const { updateClientData } = useClientData();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const { id, value } = target;
    
        setFormData((prevState) => ({
            ...prevState,
            [id]: target instanceof HTMLInputElement && target.type === 'checkbox' 
                ? target.checked 
                : value,
        }));
    };
    
    

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Retrieve existing clients from local storage, or initialize as an empty array if not present
        const existingClients = JSON.parse(localStorage.getItem('ClientList') || '[]');

        // Check if existingClients is an array
        const updatedClients = Array.isArray(existingClients) ? [...existingClients, formData] : [formData];

        // Save the updated list to local storage
        localStorage.setItem('ClientList', JSON.stringify(updatedClients));

        console.log('Form Data Submitted:', formData);

        // Use the postClient function from api.ts to send the data
        try {
            const result = await postData<newClientFormData>('clients', formData);
            console.log('Server response:', result);

            // Update client data in the app
            updateClientData(updatedClients);

            // Clear form data after submission
            setFormData({
                id: generateUniqueId(),
                clientName: '',
                clientEmail: '',
                clientPhone: '',
                clientPostalCode: '',
                clientStreetAddress: '',
                clientCity: '',
                clientProvince: '',
                clientCountry: '',
                notes: '',
                invoiced: false,
                paid: false,
                paymentDate: '',
                finalPaymentDate: '',
                dateCreated: dayjs().format('YYYY-MM-DD'),
                bookings: [],
            });
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <Box
            p={10}
            mt={4}
            borderRadius="lg"
            outline="2px solid"
            outlineColor="white"
            bg={background}
        >
            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl id="clientName">
                        <FormLabel>Client Name</FormLabel>
                        <Input
                            type="text"
                            id="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="clientEmail">
                        <FormLabel>Client Email</FormLabel>
                        <Input
                            type="email"
                            id="clientEmail"
                            value={formData.clientEmail}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="clientPhone">
                        <FormLabel>Client Phone</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <PhoneIcon color={secondary} />
                            </InputLeftElement>
                            <Input
                                type='tel'
                                id="clientPhone"
                                value={formData.clientPhone}
                                onChange={handleChange}
                                placeholder='1-234-567-890' />
                        </InputGroup>
                    </FormControl>

                    <FormControl id="clientPostalCode">
                        <FormLabel>Client Postal Code</FormLabel>
                        <Input
                            type="text"
                            id="clientPostalCode"
                            value={formData.clientPostalCode}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="clientStreetAddress">
                        <FormLabel>Client Street Address</FormLabel>
                        <Input
                            type="text"
                            id="clientStreetAddress"
                            value={formData.clientStreetAddress}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="clientCity">
                        <FormLabel>Client City</FormLabel>
                        <Input
                            type="text"
                            id="clientCity"
                            value={formData.clientCity}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="clientProvince">
                        <FormLabel>Client Province</FormLabel>
                        <Input
                            type="text"
                            id="clientProvince"
                            value={formData.clientProvince}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="clientCountry">
                        <FormLabel>Client Country</FormLabel>
                        <Input
                            type="text"
                            id="clientCountry"
                            value={formData.clientCountry}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="notes">
                        <FormLabel>Notes</FormLabel>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="finalPaymentDate">
                        <FormLabel>Final Payment Date</FormLabel>
                        <Input
                            type="date"
                            id="finalPaymentDate"
                            value={formData.finalPaymentDate}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="paymentDate">
                        <FormLabel>Payment Date</FormLabel>
                        <Input
                            type="date"
                            id="paymentDate"
                            value={formData.paymentDate}
                            onChange={handleChange}
                        />
                    </FormControl>
                </SimpleGrid>

                <Box mt={{ base: 8, md: 10 }} position={"relative"} >
                    <Divider />
                    <AbsoluteCenter bg={background} px='4' w={{ base: '100%', md: 'auto' }}
                        mt={{ base: 4, md: 0 }} >
                        <Text color={secondary} fontSize={{ base: 'sm', md: 'md' }} >
                            The fields below for Client Creation Date and ID are automatically generated.
                        </Text>
                    </AbsoluteCenter>
                </Box>

                <Box mt={{ base: 4, md: 10 }} display="flex" justifyContent="flex-end">
                    <Button
                        type="submit"
                        colorScheme="blue"
                    >
                        Add Client
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default NewClientForm;
