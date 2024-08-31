// NewClientForm.tsx
import React from 'react';
import { Box, Divider, AbsoluteCenter, Text, Heading, FormControl, FormLabel, Input, Textarea,
     Button, SimpleGrid, NumberInput, NumberInputField, Checkbox, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { useBrandColors } from '../generalUtils/theme';
import dayjs from 'dayjs';
import { useState } from 'react';
import { newClientFormData } from '../generalUtils/interfaces';
import useClientData from './UseClientDataHook';

// Interface for the new client form data
// export interface newClientFormData {
//     id: number
//     clientName: string
//     clientEmail: string
//     clientPhone: string
//     clientPostalCode: string
//     clientStreetAddress: string 
//     clientCity: string
//     clientProvince: string
//     clientCountry: string
//     notes: string
//     invoiced: boolean
//     paid: boolean
//     paymentDate: string
//     finalPaymentDate: string
//     dateCreated: string
// }


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


const newClientForm = () => {
    const { primary, background, secondary, accent, text } = useBrandColors();

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
        //the current date
        dateCreated: dayjs().format('YYYY-MM-DD'),
    });

    const { updateClientData } = useClientData();

    

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const { id, value, type } = target;
        const checked = 'checked' in target ? (target as HTMLInputElement).checked : undefined;
        if (formData.id === undefined) {
            const newId = generateUniqueId();
            setFormData({
              ...formData,
              id: newId,
              [id]: type === 'checkbox' ? checked : value
            })
          } else {
            setFormData({
              ...formData,
              [id]: type === 'checkbox' ? checked : value
            })
        }
    }
    

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Retrieve existing clients from local storage, or initialize as an empty array if not present
        const existingClients = JSON.parse(localStorage.getItem('ClientList') || '[]');
    
        // Check if existingClients is an array
        const updatedClients = Array.isArray(existingClients) ? [...existingClients, formData] : [formData];
    
        // Save the updated list to local storage
        localStorage.setItem('ClientList', JSON.stringify(updatedClients));
    
        // Process or validate formData here
        console.log('Form Data Submitted:', formData);

        updateClientData(updatedClients);

        //clear form data
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
        //the current date
        dateCreated: dayjs().format('YYYY-MM-DD'),
        });
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

                    <Box></Box>
                    
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

                    <Box position='relative' padding='10' mt={8}>
                        <Divider />
                        <AbsoluteCenter bg={background} px='4' w={{ base: '100%', md: 'auto' }} 
                        mt={{ base: 4, md: 0 }} >
                            <Text color={secondary} fontSize={{ base: 'sm', md: 'md' }}>
                                The fields below for Client Creation Date and ID are automatically generated.
                            </Text>
                        </AbsoluteCenter>
                    </Box>

                    <Box mt={{ base: 12, md: 0 }} mb={4} p={4} display={"flex"} flexDirection={{ base: 'column', md: 'row' }} gap={4} >
                    <FormControl id="dateCreated">
                        <FormLabel>Date Created</FormLabel>
                        <Input
                            isReadOnly
                            type="date"
                            id="dateCreated"
                            value={formData.dateCreated}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="id">
                        <FormLabel>ID</FormLabel>
                        <Input
                            isReadOnly
                            type="number"
                            id="id"
                            value={formData.id}
                            onChange={handleChange}
                        />
                    </FormControl>

                </Box>
                <Button
                    mt={4}
                    bg={primary}
                    color={secondary}
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Box>
    )
}

export default newClientForm