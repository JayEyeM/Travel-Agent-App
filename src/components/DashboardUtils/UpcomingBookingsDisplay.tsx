import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import useBookingsData from '../bookingFormUtils/useBookingsData';
import { bookingFormData } from '../generalUtils/interfaces';
import { useBrandColors } from '../generalUtils/theme';

dayjs.extend(isBetween);

const UpcomingBookingsDisplay: React.FC = () => {
  const { getAllBookings } = useBookingsData();
  const [bookings, setBookings] = useState<bookingFormData[]>([]);
  const [clientNames, setClientNames] = useState<Map<number, string>>(new Map());

  const { background, accent, secondary, text, primary } = useBrandColors();

  useEffect(() => {
    const fetchBookings = () => {
      try {
        const allBookings = getAllBookings();
        console.log('All Bookings:', allBookings);

        // Filter for upcoming bookings within the next 14 days and sort by travel date (soonest first)
        const upcomingBookings = allBookings
          .filter((booking: bookingFormData) =>
            dayjs(booking.travelDate).isBetween(dayjs(), dayjs().add(14, 'day'))
          )
          // Sort by travel date in ascending order (soonest first)
          .sort((a, b) => dayjs(a.travelDate).diff(dayjs(b.travelDate)));

        console.log('Upcoming Bookings:', upcomingBookings);
        setBookings(upcomingBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    const fetchClientNames = () => {
      try {
        const clients = JSON.parse(localStorage.getItem('ClientList') || '[]');
        console.log('Fetched clients:', clients);

        const clientIdNames = new Map<number, string>();
        clients.forEach((client: { id: number; clientName: string }) => {
          clientIdNames.set(client.id, client.clientName || 'Unknown Client');
        });
        setClientNames(clientIdNames);
      } catch (error) {
        console.error('Failed to fetch client data:', error);
      }
    };

    fetchBookings();
    fetchClientNames();
  }, [getAllBookings]);

  return (
    <Box p={4} w={{ base: '100%', md: '80%' }} ml={'auto'} mr={'auto'} borderWidth={1} borderRadius="lg" boxShadow={'0px 0px 5px 2px gray'} mt={10}>
      <Heading color={accent} size={"lg"} mb={4} fontWeight="bold">Upcoming Bookings</Heading>
      <Text fontSize="lg" mb={4}>Within the next 14 days</Text>
      {bookings.length > 0 ? (
        <Box 
        my={4} p={4} borderWidth={1} borderRadius="lg"
        w={'100%'} minH={'350px'} maxH={'500px'} overflowX={'scroll'} overflowY={'scroll'}
        >
          
        <Table variant="striped" borderRadius={"lg"}>
          <Thead borderTopRadius={"lg"} bg={"gray.900"}>
            <Tr>
              <Th color={secondary}>Travel Date</Th>
              <Th color={secondary}>Client Name</Th>
              <Th color={secondary}>Confirmation Numbers</Th>
              <Th color={secondary}>Names and Dates of Birth</Th>
              <Th color={secondary}>Phone Numbers</Th>
              <Th color={secondary}>Email Addresses</Th>
            </Tr>
          </Thead>
          <Tbody >
            {bookings.map((booking, index) => (
              <Tr key={index}>
                <Td>{dayjs(booking.travelDate).format('YYYY-MM-DD')}</Td>
                <Td>{clientNames.get(booking.id) || 'Unknown Client'}</Td>
                <Td>
                  {booking.confirmationNumbers.map((entry, i) => (
                    <div key={i}>{entry.confirmationNumber} - {entry.supplier}</div>
                  ))}
                </Td>
                <Td>
                  {booking.namesDateOfBirths.map((entry, i) => (
                    <div key={i}>{entry.name} (DOB: {entry.dateOfBirth})</div>
                  ))}
                </Td>
                <Td>{booking.phoneNumbers.join(', ')}</Td>
                <Td>{booking.emailAddresses.join(', ')}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        </Box>
      ) : (
        <Text>No upcoming bookings found.</Text>
      )}
    </Box>
  );
};

export default UpcomingBookingsDisplay;
