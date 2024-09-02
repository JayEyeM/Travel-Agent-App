import React, { useEffect, useState } from 'react';
import { Box, Text, IconButton } from '@chakra-ui/react';
import useBookingsData from './useBookingsData';
import { bookingFormData } from '../generalUtils/interfaces';
import ClosableBox2 from '../generalUtils/ClosableBox2';
import { DeleteIcon } from '@chakra-ui/icons';
import { useBrandColors } from '../generalUtils/theme';

interface ClientBookingsProps {
  clientId: number;
}

const ClientBookings: React.FC<ClientBookingsProps> = ({ clientId }) => {
  const { getBookingsByClientId } = useBookingsData();
  const [bookings, setBookings] = useState<bookingFormData[]>([]);
  const [clientName, setClientName] = useState<string>('');

  const { primary, background, secondary, accent, text } = useBrandColors();

  useEffect(() => {
    // Fetch bookings from local storage when component mounts or clientId changes
    const fetchBookings = () => {
      const clientBookings = getBookingsByClientId(clientId);
      setBookings(clientBookings);
    };
    // Fetch client name and bookings
    const fetchClientData = () => {
        const clients = JSON.parse(localStorage.getItem('ClientList') || '[]');
        const client = clients.find((c: any) => c.id === clientId);
        if (client) {
          setClientName(client.clientName || ''); // Update clientName state
        }
      };
  
      fetchClientData();
      fetchBookings();
    }, [clientId, getBookingsByClientId]);

  // Function to delete a booking specific to the delete button on each booking
  const handleDeleteClick = (bookingId: string) => {
    const updatedBookings = bookings.filter((b) => b.bookingId !== bookingId);
    setBookings(updatedBookings);
  
    // Update local storage to remove the deleted booking
    const clients = JSON.parse(localStorage.getItem('ClientList') || '[]');
    const client = clients.find((c: any) => c.id === clientId);
    if (client) {
      client.bookings = updatedBookings;
      localStorage.setItem('ClientList', JSON.stringify(clients));
    }
  };
  
  
  
  return (
    <ClosableBox2
      title={`${bookings.length > 0 ? "View Bookings for " : "No Bookings for "} ${clientName}`}
      buttonText="View Bookings"
      onOpen={() => {}}
      onClose={() => {}}
      children={
        <Box w={{ base: '60vw', md: 'auto' }} borderRadius={"lg"}  >
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <Box key={index} 
            display={"flex"} 
            flexDirection="column"
            justifyContent={{ base: 'center', md: 'flex-start' }} 
            alignItems={{ base: 'center', md: 'flex-start' }}
            border="1px" borderColor="gray.200" p={4} mt={4} mb={6}
            borderRadius={"lg"} w={"100%"} bg={background} boxShadow=" 0px 0px 10px 5px gray " >
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'} >Travel Date:</Text> {booking.travelDate}</Text>
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'}>Client Final Payment Date:</Text> {booking.clientFinalPaymentDate}</Text>
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'}>Supplier Final Payment Date:</Text> {booking.supplierFinalPaymentDate}</Text>
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'}>Booking Date:</Text> {booking.bookingDate}</Text>
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'}>Invoiced Date:</Text> {booking.invoicedDate}</Text>
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'}>Confirmation Numbers:</Text> {booking.confirmationNumbers.join(', ')}</Text>
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'}>Names and Date of Births:</Text> {booking.namesDateOfBirths.map((entry, i) => (
                <span key={i}>{entry.name} (DOB: {entry.dateOfBirth}){i < booking.namesDateOfBirths.length - 1 ? ', ' : ''}</span>
              ))}</Text>
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'}>Mailing Address:</Text> {booking.mailingAddress}</Text>
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'}>Phone Numbers:</Text> {booking.phoneNumbers.join(', ')}</Text>
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'}>Email Addresses:</Text> {booking.emailAddresses.join(', ')}</Text>
              <Text fontSize={'lg'}><Text as={'b'} color={accent} fontSize={'sm'}>Significant Dates:</Text> {booking.significantDates.join(', ')}</Text>
              <Box display="flex" 
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
          <Text boxShadow={" 0px 0px 10px 5px rgba(200, 0, 0, 0.5) "} p={4} fontWeight={'bold'} color={'red.500'} bg={'black'} borderRadius={"lg"} mt={8} fontSize={'lg'}>Click the "Add Booking" button above
            and fill out the booking form to populate this section.</Text>
        )}
      </Box>
      }
    />
      
    
  );
};


export default ClientBookings;
