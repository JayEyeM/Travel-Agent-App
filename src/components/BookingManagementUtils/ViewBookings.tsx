import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Heading,
    Text,
    Card,
    CardBody,
    CardHeader,
    SimpleGrid,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useBrandColors } from '../generalUtils/theme';
import ClosableBox3 from '../generalUtils/ClosableBox3';
import { bookingFormData, newClientFormData } from '../generalUtils/interfaces';
import useBookingData from './UseBookingDataHook';
import EditBookingForm from './EditBookingForm';

interface ViewBookingsProps {
    clientId?: number;
}

const ViewBookings: React.FC<ViewBookingsProps> = ({ clientId }) => {
    const { background, secondary } = useBrandColors();
    const { bookingData, updateBookingData, deleteBooking, addBooking } = useBookingData();

    // Filter bookings for the given clientId
    const clientBookings = bookingData.filter((b) => b.clientId === clientId); // Ensure clientId is used correctly
    const [editingBooking, setEditingBooking] = useState<bookingFormData | null>(null);

    useEffect(() => {
        if (clientId) {
            // Optional: Fetch additional bookings if required
        }
    }, [clientId]);

    const handleDeleteClick = async (bookingId: string) => {
        if (window.confirm(`Are you sure you want to delete this booking?`)) {
            await deleteBooking(bookingId);
            const updatedBookings = clientBookings.filter(
                (b: bookingFormData) => b.bookingId !== bookingId
            );
            updateBookingData(updatedBookings);
        }
    };

    const handleEditClick = (booking: bookingFormData) => {
        setEditingBooking(booking);
    };

    const handleCancelEdit = () => {
        setEditingBooking(null);
    };

    const handleSubmitEdit = async (updatedBooking: bookingFormData) => {
        await addBooking(updatedBooking);
        const updatedBookings = clientBookings.map((b: bookingFormData) =>
            b.bookingId === updatedBooking.bookingId ? updatedBooking : b
        );
        updateBookingData(updatedBookings);
        setEditingBooking(null);
    };

    if (!clientBookings.length) {
        return <Text>No bookings found for this client.</Text>;
    }

    return (
        <Box>
            <Heading size="lg" mb={4}>
                Bookings for Client ID: {clientId || 'Unknown Client'}
            </Heading>
            {clientBookings.map((b: bookingFormData) => (
                <ClosableBox3
                    key={b.bookingId}
                    title={`Booking on ${b.travelDate}`}
                    buttonText={`Booking ID: ${b.bookingId} | Date: ${b.travelDate}`}
                    onClose={() => {}}
                    onOpen={() => {}}
                >
                    <Card bg={background} borderRadius="lg" p={4} mt={4}>
                        <CardHeader>
                            <Heading size="md">Booking Details</Heading>
                        </CardHeader>
                        <CardBody>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <Text>
                                    <Text as="span" color={secondary}>
                                        Booking ID:
                                    </Text>{' '}
                                    {b.bookingId}
                                </Text>
                                <Text>
                                    <Text as="span" color={secondary}>
                                        Date:
                                    </Text>{' '}
                                    {b.travelDate}
                                </Text>
                                <Text>
                                    <Text as="span" color={secondary}>
                                        Notes:
                                    </Text>{' '}
                                    {b.notes || 'No notes available'}
                                </Text>
                                {b.amount && (
                                    <Text>
                                        <Text as="span" color={secondary}>
                                            Amount:
                                        </Text>{' '}
                                        ${b.amount}
                                    </Text>
                                )}
                            </SimpleGrid>
                            <Button
                                leftIcon={<EditIcon />}
                                onClick={() => handleEditClick(b)}
                                mt={4}
                            >
                                Edit Booking
                            </Button>
                            <Button
                                leftIcon={<DeleteIcon />}
                                colorScheme="red"
                                onClick={() => handleDeleteClick(b.bookingId)}
                                mt={4}
                            >
                                Delete Booking
                            </Button>
                        </CardBody>
                    </Card>
                </ClosableBox3>
            ))}

            {editingBooking && (
                <EditBookingForm
                    booking={editingBooking}
                    onCancel={handleCancelEdit}
                    onSubmit={handleSubmitEdit}
                />
            )}
        </Box>
    );
};

export default ViewBookings;
