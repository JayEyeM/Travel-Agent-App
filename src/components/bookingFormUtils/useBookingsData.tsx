import { useCallback } from 'react';
import { bookingFormData } from '../generalUtils/interfaces';

const useBookingsData = () => {
  // Function to save booking data to local storage
  const saveBooking = useCallback((clientId: number, booking: bookingFormData) => {
    // Get the current list of clients from local storage
    const clients = JSON.parse(localStorage.getItem('ClientList') || '[]');
    
    // Find the client by ID
    const client = clients.find((c: any) => c.id === clientId);

    if (client) {
      // Initialize bookings array if not present
      client.bookings = client.bookings || [];

      // Find if booking already exists by bookingId
      const existingBookingIndex = client.bookings.findIndex((b: any) => b.bookingId === booking.bookingId);

      if (existingBookingIndex > -1) {
        // Update existing booking
        client.bookings[existingBookingIndex] = booking;
      } else {
        // Add new booking
        client.bookings.push(booking);
      }

      // Update the local storage with the modified clients array
      localStorage.setItem('ClientList', JSON.stringify(clients));
    }
  }, []);

  // Function to get bookings by client ID
  const getBookingsByClientId = useCallback((clientId: number) => {
    // Get the current list of clients from local storage
    const clients = JSON.parse(localStorage.getItem('ClientList') || '[]');
    
    // Find the client by ID and return their bookings
    const client = clients.find((c: any) => c.id === clientId);
    return client ? client.bookings || [] : [];
  }, []);

  return { saveBooking, getBookingsByClientId };
};

export default useBookingsData;
