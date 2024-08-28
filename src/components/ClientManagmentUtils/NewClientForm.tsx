// NewClientForm.tsx
import React from 'react';
import { Box, Text, Heading, FormControl, FormLabel, Input, Textarea, Button, SimpleGrid, NumberInput, NumberInputField, Checkbox, useColorModeValue } from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';
import dayjs from 'dayjs';
import { useState } from 'react';

// Interface for the new client form data
//id: string
//clientName: string
//supplier: string
//bookingNumber: number
//notes: string
//invoiced: boolean
//finalPaymentDate: string
//paid: boolean
//paymentDate: string

interface newClientFormData {
    id: number
    clientName: string
    supplier: string
    bookingNumber: number
    notes: string
    invoiced: boolean
    finalPaymentDate: string
    paid: boolean
    paymentDate: string
    dateCreated: string
}





const newClientForm = () => {
    const { primary, background, secondary, accent, text } = useBrandColors();

    // Initialize state with the newClientFormData interface
    const [formData, setFormData] = useState<newClientFormData>({
        id: 0,
        clientName: '',
        supplier: '',
        bookingNumber: 0,
        notes: '',
        invoiced: false,
        finalPaymentDate: '',
        paid: false,
        paymentDate: '',
        //the current date
        dateCreated: dayjs().format('YYYY-MM-DD'),
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const { id, value, type } = target;
        const checked = 'checked' in target ? (target as HTMLInputElement).checked : undefined;
        if (id === 'bookingNumber') {
            setFormData({
                ...formData,
                id: parseInt(value), 
                bookingNumber: parseInt(value)
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
                    <FormControl id="id">
                        <FormLabel>ID</FormLabel>
                        <Input
                            type="number"
                            id="id"
                            value={formData.id}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl id="clientName">
                        <FormLabel>Client Name</FormLabel>
                        <Input
                            type="text"
                            id="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl id="supplier">
                        <FormLabel>Supplier</FormLabel>
                        <Input
                            type="text"
                            id="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl id="bookingNumber">
                        <FormLabel>Booking Number</FormLabel>
                        <Input
                            type="number"
                            id="bookingNumber"
                            value={formData.bookingNumber}
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
                    <FormControl id="invoiced">
                        <FormLabel>Invoiced</FormLabel>
                        <Checkbox
                            id="invoiced"
                            checked={formData.invoiced}
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
                    <FormControl id="paid">
                        <FormLabel>Paid</FormLabel>
                        <Checkbox
                            id="paid"
                            checked={formData.paid}
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
                    <FormControl id="dateCreated">
                        <FormLabel>Date Created</FormLabel>
                        <Input
                            type="date"
                            id="dateCreated"
                            value={formData.dateCreated}
                            onChange={handleChange}
                        />
                    </FormControl>
                </SimpleGrid>
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