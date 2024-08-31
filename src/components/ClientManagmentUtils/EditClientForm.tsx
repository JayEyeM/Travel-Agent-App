import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Checkbox } from '@chakra-ui/react';
import { newClientFormData } from '../generalUtils/interfaces';

interface EditClientFormProps {
    client: newClientFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

const EditClientForm: React.FC<EditClientFormProps> = ({ client, onChange, onSubmit, onCancel }) => {
    return (
        <Box mt={4}>
            <form onSubmit={onSubmit}>
                <FormControl id="clientName">
                    <FormLabel>Client Name</FormLabel>
                    <Input
                        type="text"
                        id="clientName"
                        value={client.clientName}
                        onChange={onChange}
                    />
                </FormControl>
                
                <FormControl id="clientEmail">
                    <FormLabel>Client Email</FormLabel>
                    <Input
                        type="email"
                        id="clientEmail"
                        value={client.clientEmail}
                        onChange={onChange}
                    />
                </FormControl>

                <FormControl id="clientPhone">
                    <FormLabel>Client Phone</FormLabel>
                    <Input
                        type="tel"
                        id="clientPhone"
                        value={client.clientPhone}
                        onChange={onChange}
                    />
                </FormControl>

                <FormControl id="clientPostalCode">
                    <FormLabel>Client Postal Code</FormLabel>
                    <Input
                        type="text"
                        id="clientPostalCode"
                        value={client.clientPostalCode}
                        onChange={onChange}
                    />
                </FormControl>

                <FormControl id="clientStreetAddress">
                    <FormLabel>Client Street Address</FormLabel>
                    <Input
                        type="text"
                        id="clientStreetAddress"
                        value={client.clientStreetAddress}
                        onChange={onChange}
                    />
                </FormControl>

                <FormControl id="clientCity">
                    <FormLabel>Client City</FormLabel>
                    <Input
                        type="text"
                        id="clientCity"
                        value={client.clientCity}
                        onChange={onChange}
                    />
                </FormControl>

                <FormControl id="clientProvince">
                    <FormLabel>Client Province</FormLabel>
                    <Input
                        type="text"
                        id="clientProvince"
                        value={client.clientProvince}
                        onChange={onChange}
                    />
                </FormControl>

                <FormControl id="clientCountry">
                    <FormLabel>Client Country</FormLabel>
                    <Input
                        type="text"
                        id="clientCountry"
                        value={client.clientCountry}
                        onChange={onChange}
                    />
                </FormControl>

                
                <FormControl id="notes">
                    <FormLabel>Notes</FormLabel>
                    <Textarea
                        id="notes"
                        value={client.notes}
                        onChange={onChange}
                    />
                </FormControl>
                
                <FormControl id="finalPaymentDate">
                    <FormLabel>Final Payment Date</FormLabel>
                    <Input
                        type="date"
                        id="finalPaymentDate"
                        value={client.finalPaymentDate}
                        onChange={onChange}
                    />
                </FormControl>
                
                <FormControl id="paymentDate">
                    <FormLabel>Payment Date</FormLabel>
                    <Input
                        type="date"
                        id="paymentDate"
                        value={client.paymentDate}
                        onChange={onChange}
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
