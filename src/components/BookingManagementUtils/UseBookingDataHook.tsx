import { useState, useEffect } from 'react';
import { bookingFormData } from '../generalUtils/interfaces'; 
import { getData, postData, updateData, deleteData } from '../generalUtils/APIs'; 

const useBookingData = () => {
  const [bookingData, setBookingData] = useState<bookingFormData[]>([]);

  // Fetch booking data from backend using the API helper
  const fetchBookingsFromBackend = async () => {
    try {
      const data = await getData<bookingFormData[]>('bookings'); // Fetch bookings
      console.log('Data from backend (bookings):', data); // Log to verify response
      setBookingData(data); // Update state with backend data
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Load booking data on initial render
  useEffect(() => {
    fetchBookingsFromBackend(); // Fetch from backend on initial load
  }, []);

  // Function to add a new booking
  const addBooking = async (newBooking: bookingFormData) => {
    try {
      const addedBooking = await postData<bookingFormData>('bookings', newBooking); // Add booking via API
      setBookingData((prevBookings) => [...prevBookings, addedBooking]); // Update state with the new booking
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  // Function to update an existing booking
  const updateBooking = async (bookingId: string, updatedBookingData: bookingFormData) => {
    try {
      const updatedBooking = await updateData<bookingFormData>(
        `bookings/${Number(bookingId)}`, // Convert to number
        updatedBookingData
      );
      setBookingData((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === Number(bookingId) ? updatedBooking : booking
        )
      );
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  // Function to delete a booking
  const deleteBooking = async (bookingId: string) => {
    try {
      await deleteData(`bookings/${Number(bookingId)}`); // Delete booking via API
      setBookingData((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== Number(bookingId))
      ); // Remove the deleted booking from state
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  // Function to manually update booking state (if needed)
  const updateBookingData = (updatedBookings: bookingFormData[]) => {
    setBookingData(updatedBookings);
  };

  return { bookingData, addBooking, updateBooking, deleteBooking, updateBookingData };
};

export default useBookingData;
