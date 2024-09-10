import React, { useEffect, useState } from 'react';
import { Box, Text, IconButton } from '@chakra-ui/react';
import useBookingsData from './useBookingsData';
import { bookingFormData } from '../generalUtils/interfaces';
import ClosableBox2 from '../generalUtils/ClosableBox2';
import { DeleteIcon } from '@chakra-ui/icons';
import { useBrandColors } from '../generalUtils/theme';
import BookingChecklist from './BookingChecklist';

interface ClientBookingsProps {
  clientId: number;
}

const ClientBookings: React.FC<ClientBookingsProps> = ({ clientId }) => {
  const { getBookingsByClientId } = useBookingsData();
  const [bookings, setBookings] = useState<bookingFormData[]>([]);
  const [clientName, setClientName] = useState<string>('');
  const { background, accent } = useBrandColors();

  useEffect(() => {
    const fetchBookings = () => {
      try {
        const clientBookings = getBookingsByClientId(clientId);
        console.log('Fetched bookings:', clientBookings); // Debug log
        setBookings(clientBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    const fetchClientData = () => {
      try {
        const clients = JSON.parse(localStorage.getItem('ClientList') || '[]');
        console.log('Fetched clients:', clients); // Debug log
        const client = clients.find((c: any) => c.id === clientId);
        if (client) {
          setClientName(client.clientName || '');
        }
      } catch (error) {
        console.error('Failed to fetch client data:', error);
      }
    };

    fetchBookings();
    fetchClientData();
  }, [clientId, getBookingsByClientId]);

  const handleDeleteClick = (bookingId: string) => {
    const updatedBookings = bookings.filter((b) => b.bookingId !== bookingId);
    console.log('Updated bookings after delete:', updatedBookings); // Debug log
    setBookings(updatedBookings);

    try {
      const clients = JSON.parse(localStorage.getItem('ClientList') || '[]');
      const client = clients.find((c: any) => c.id === clientId);
      if (client) {
        client.bookings = updatedBookings;
        console.log('Updating client data in local storage:', clients); // Debug log
        localStorage.setItem('ClientList', JSON.stringify(clients));
      }
    } catch (error) {
      console.error('Failed to update client data in local storage:', error);
    }
  };

  return (
    <ClosableBox2
      title={`${bookings.length > 0 ? "View Bookings for " : "No Bookings for "} ${clientName}`}
      buttonText="View Bookings"
      onOpen={() => {}}
      onClose={() => {}}
      children={
        <Box w={{ base: '60vw', md: 'auto' }} borderRadius={"lg"}>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              
              <Box key={index}
              bg={background}
                  boxShadow="0px 0px 10px 5px gray"
                  border="1px"
                  borderColor="gray.200"
                  borderRadius={"lg"}
                  mt={4}
                  mb={4}
              >
                <Box
                  display={"flex"}
                  flexDirection={{ base: 'column', md: 'row' }}
                  bg={background}
                  
                  p={2}
                  mt={4}
                  mb={6}
                  borderRadius={"lg"}
                  w={"100%"}
                  >
                  <Box
                  
                  display={"flex"}
                  flexDirection="column"
                  justifyContent={{ base: 'center', md: 'flex-start' }}
                  alignItems={{ base: 'center', md: 'flex-start' }}
                  w={"100%"}
                  >
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Travel Date:</Text> {booking.travelDate}
                    </Text>
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Client Final Payment Date:</Text> {booking.clientFinalPaymentDate}
                    </Text>
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Supplier Final Payment Date:</Text> {booking.supplierFinalPaymentDate}
                    </Text>
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Booking Date:</Text> {booking.bookingDate}
                    </Text>
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Invoiced Date:</Text> {booking.invoicedDate}
                    </Text>
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Confirmation Numbers:</Text> {booking.confirmationNumbers.join(', ')}
                    </Text>
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Names and Date of Births:</Text> {booking.namesDateOfBirths.map((entry, i) => (
                        <span key={i}>{entry.name} (DOB: {entry.dateOfBirth}){i < booking.namesDateOfBirths.length - 1 ? ', ' : ''}</span>
                      ))}
                    </Text>
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Mailing Address:</Text> {booking.mailingAddress}
                    </Text>
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Phone Numbers:</Text> {booking.phoneNumbers.join(', ')}
                    </Text>
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Email Addresses:</Text> {booking.emailAddresses.join(', ')}
                    </Text>
                    <Text fontSize={'lg'}>
                      <Text as={'b'} color={accent} fontSize={'sm'}>Significant Dates:</Text> {booking.significantDates.join(', ')}
                    </Text>
                  
                    
                  </Box>
                  <Box>
                    <BookingChecklist clientId={clientId} bookingId={booking.bookingId ?? ''} />
                  </Box>
                </Box>
                  
                
                  
                <Box
                  display="flex"
                  flexDirection="row"
                  w={"100%"}
                  justifyContent="right"
                  alignItems="center"
                  mt={4}
                >
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    variant="outline"
                    colorScheme='red'
                    m={4}
                    onClick={() => handleDeleteClick(booking.bookingId ?? '')}
                  />
                </Box>
              </Box>
            ))
          ) : (
            <Text
              boxShadow={"0px 0px 10px 5px rgba(200, 0, 0, 0.5)"}
              p={4}
              fontWeight={'bold'}
              color={'red.500'}
              bg={'black'}
              borderRadius={"lg"}
              mt={8}
              fontSize={'lg'}
            >
              Click the "Add Booking" button above and fill out the booking form to populate this section.
            </Text>
          )}
        </Box>
      }
    />
  );
};

export default ClientBookings;
