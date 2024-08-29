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
                <FormControl id="supplier">
                    <FormLabel>Supplier</FormLabel>
                    <Input
                        type="text"
                        id="supplier"
                        value={client.supplier}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl id="bookingNumber">
                    <FormLabel>Booking Number</FormLabel>
                    <Input
                        type="number"
                        id="bookingNumber"
                        value={client.bookingNumber}
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
                <FormControl id="invoiced">
                    <Checkbox
                        id="invoiced"
                        isChecked={client.invoiced}
                        onChange={onChange}
                    >
                        Invoiced?
                    </Checkbox>
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
                <FormControl id="paid">
                    <Checkbox
                        id="paid"
                        isChecked={client.paid}
                        onChange={onChange}
                    >
                        Paid?
                    </Checkbox>
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
