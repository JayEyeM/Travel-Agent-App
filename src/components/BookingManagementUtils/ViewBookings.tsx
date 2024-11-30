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
import useBookingData from './UseBookingDataHook';
import { useBrandColors } from '../generalUtils/theme';
import ClosableBox3 from '../generalUtils/ClosableBox3';
import { newClientFormData, bookingFormData } from '../generalUtils/interfaces';
import { deleteBooking, updateBooking } from '../api/bookingAPI';  // Hypothetical API calls

interface ViewBookingsProps {
    clientId?: number;
}

const ViewBookings: React.FC<ViewBookingsProps> = ({ clientId }) => {
    const { background, secondary } = useBrandColors();
    const { bookingFormDataArray: bookingData, updateBookingData, fetchBookings } = useBookingData();  // Assume this fetches bookings from the backend

    // Fetch the client with the specific ID
    const client = bookingData.find((c) => c.id === clientId);
    const [editingBooking, setEditingBooking] = useState<bookingFormData | null>(null);

    // Fetch the bookings from the backend (if needed)
    useEffect(() => {
        if (clientId) {
            fetchBookings(clientId); // Fetch bookings for the client on component mount
        }
    }, [clientId, fetchBookings]);

    const handleDeleteClick = async (bookingId: string) => {
        if (window.confirm(`Are you sure you want to delete this booking?`)) {
            if (client) {
                // Make API call to delete booking
                await deleteBooking(bookingId);

                // Update state to reflect the deletion (without using localStorage)
                const updatedBookings = client.bookings.filter((b) => b.bookingId !== bookingId);
                const updatedClientBooking = { ...client, bookings: updatedBookings };
                const updatedBookingList = bookingData.map((c: newClientFormData) =>
                    c.id === client.id ? updatedClientBooking : c
                );

                updateBookingData(updatedBookingList); // Update the state after deletion
            }
        }
    };

    const handleEditClick = (booking: bookingFormData) => {
        setEditingBooking(booking);
    };

    const handleCancelEdit = () => {
        setEditingBooking(null);
    };

    const handleSubmitEdit = async (updatedBooking: bookingFormData) => {
        if (client) {
            // Make API call to update the booking
            await updateBooking(updatedBooking);

            // Update state after successful update
            const updatedBookings = client.bookings.map((b) =>
                b.bookingId === updatedBooking.bookingId ? updatedBooking : b
            );
            const updatedClientBooking = { ...client, bookings: updatedBookings };
            const updatedBookingList = bookingData.map((c: newClientFormData) =>
                c.id === client.id ? updatedClientBooking : c
            );

            updateBookingData(updatedBookingList); // Update the state after edit
            setEditingBooking(null); // Close the edit form
        }
    };

    if (!client || !client.bookings.length) {
        return <Text>No bookings found for this client.</Text>;
    }

    return (
        <Box>
            <Heading size="lg" mb={4}>
                Bookings for {client.clientName}
            </Heading>
            {client.bookings.map((b: bookingFormData) => (
                <ClosableBox3
                    key={b.bookingId}
                    title={`Booking on ${b.travelDate}`}
                    buttonText={`Booking ID: ${b.bookingId} | Date: ${b.travelDate}`}
                    onClose={() => console.log('Close button clicked')}
                    onOpen={() => console.log('Open button clicked')}
                >
                    <Card
                        bg={background}
                        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                        borderRadius="lg"
                        p={4}
                        mt={4}
                        position="relative"
                        w="100%"
                    >
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
                                <Text>
                                    <Text as="span" color={secondary}>
                                        Amount:
                                    </Text>{' '}
                                    {b.amount || 'N/A'}
                                </Text>
                            </SimpleGrid>
                            <Button
                                mt={4}
                                colorScheme="blue"
                                leftIcon={<EditIcon />}
                                onClick={() => handleEditClick(b)}
                            >
                                Edit Booking
                            </Button>
                            <Button
                                mt={4}
                                ml={2}
                                colorScheme="red"
                                leftIcon={<DeleteIcon />}
                                onClick={() => handleDeleteClick(b.bookingId)}
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
