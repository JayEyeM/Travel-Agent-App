import { Box, Button, Text } from '@chakra-ui/react';
import { bookingFormData } from '../generalUtils/interfaces';

interface EditBookingFormProps {
    booking: bookingFormData;
    onCancel: () => void;
    onSubmit: (updatedBooking: bookingFormData) => void;
}

const EditBookingForm: React.FC<EditBookingFormProps> = ({ booking, onCancel, onSubmit }) => {
    return (
        <Box>
            <Text>Edit booking details here...</Text>
            <Button onClick={() => onSubmit({ ...booking })}>Submit</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </Box>
    );
};

export default EditBookingForm;
