import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
import { newClientFormData } from '../generalUtils/interfaces';

interface EditClientFormProps {
    client: newClientFormData;
    onCancel: () => void;
    onUpdateClient: (updatedClient: newClientFormData) => void;
}

const EditClientForm: React.FC<EditClientFormProps> = ({ client, onCancel, onUpdateClient }) => {
    const [updatedClientData, setUpdatedClientData] = useState(client);
    const toast = useToast();

   // Handle form input changes
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;

    
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setUpdatedClientData(prevState => ({
        ...prevState,
        [id]: fieldValue,
    }));
};


    // Handle form submission for updating client
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4000/clients/${updatedClientData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedClientData),
            });

            if (!response.ok) {
                throw new Error('Failed to update client');
            }

            const result = await response.json();
            console.log('Client updated:', result);

           
            onUpdateClient(result);

            
            toast({
                title: 'Client updated successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error updating client:', error);
            toast({
                title: 'Error updating client.',
                description: 'Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box mt={4}>
            <form onSubmit={handleUpdate}>
                <FormControl id="clientName">
                    <FormLabel>Client Name</FormLabel>
                    <Input
                        type="text"
                        id="clientName"
                        value={updatedClientData.clientName}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="clientEmail">
                    <FormLabel>Client Email</FormLabel>
                    <Input
                        type="email"
                        id="clientEmail"
                        value={updatedClientData.clientEmail}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="clientPhone">
                    <FormLabel>Client Phone</FormLabel>
                    <Input
                        type="tel"
                        id="clientPhone"
                        value={updatedClientData.clientPhone}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="clientPostalCode">
                    <FormLabel>Client Postal Code</FormLabel>
                    <Input
                        type="text"
                        id="clientPostalCode"
                        value={updatedClientData.clientPostalCode}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="clientStreetAddress">
                    <FormLabel>Client Street Address</FormLabel>
                    <Input
                        type="text"
                        id="clientStreetAddress"
                        value={updatedClientData.clientStreetAddress}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="clientCity">
                    <FormLabel>Client City</FormLabel>
                    <Input
                        type="text"
                        id="clientCity"
                        value={updatedClientData.clientCity}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="clientProvince">
                    <FormLabel>Client Province</FormLabel>
                    <Input
                        type="text"
                        id="clientProvince"
                        value={updatedClientData.clientProvince}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="clientCountry">
                    <FormLabel>Client Country</FormLabel>
                    <Input
                        type="text"
                        id="clientCountry"
                        value={updatedClientData.clientCountry}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="notes">
                    <FormLabel>Notes</FormLabel>
                    <Textarea
                        id="notes"
                        value={updatedClientData.notes}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="paymentDate">
                    <FormLabel>Payment Date</FormLabel>
                    <Input
                        type="date"
                        id="paymentDate"
                        value={updatedClientData.paymentDate}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="finalPaymentDate">
                    <FormLabel>Final Payment Date</FormLabel>
                    <Input
                        type="date"
                        id="finalPaymentDate"
                        value={updatedClientData.finalPaymentDate}
                        onChange={handleChange}
                    />
                </FormControl>

                <Button mt={4} colorScheme="teal" type="submit">
                    Save Changes
                </Button>
                <Button mt={4} ml={4} onClick={onCancel}>
                    Cancel
                </Button>
            </form>
        </Box>
    );
};

export default EditClientForm;
