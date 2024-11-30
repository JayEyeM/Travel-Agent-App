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
import useBookingData from './UseBookingDataHook';  // Importing your custom hook
import { useBrandColors } from '../generalUtils/theme';
import ClosableBox3 from '../generalUtils/ClosableBox3';
import { bookingFormData } from '../generalUtils/interfaces';

interface ViewBookingsProps {
    clientId?: number;
}

const ViewBookings: React.FC<ViewBookingsProps> = ({ clientId }) => {
    const { background, secondary } = useBrandColors();
    const { bookingFormDataArray, updateBookingData, updateBooking } = useBookingData(); // Accessing functions from the custom hook

    const [editingBooking, setEditingBooking] = useState<bookingFormData | null>(null);

    // Fetch the client with the specific ID (assuming `clientId` is passed as prop)
    const client = bookingFormDataArray.find((booking) => booking.clientId === clientId);
    
    // Fetch bookings on initial render
    useEffect(() => {
        if (clientId) {
            // The bookings are fetched already by useBookingData, so nothing else needs to happen here
        }
    }, [clientId]);

    const handleDeleteClick = async (bookingId: string) => {
        if (window.confirm(`Are you sure you want to delete this booking?`)) {
            try {
                // Assuming you have a backend route to delete bookings
                await fetch(`/api/bookings/${bookingId}`, {
                    method: 'DELETE',
                });

                // After successful deletion, update the UI state
                updateBookingData(bookingFormDataArray.filter((b) => b.bookingId !== bookingId));
            } catch (error) {
                console.error('Error deleting booking:', error);
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
        try {
            await updateBooking(updatedBooking.bookingId, updatedBooking);

            // Update the local state after the backend call
            updateBookingData(bookingFormDataArray.map((b) =>
                b.bookingId === updatedBooking.bookingId ? updatedBooking : b
            ));

            setEditingBooking(null); // Close the edit form
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    if (!client || !client.bookings || client.bookings.length === 0) {
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
