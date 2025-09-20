// src/hooks/useBookingAPIs.tsx
import { useState, useCallback } from "react";
import * as BookingAPI from "../api/BookingAPIs";

export function useBookingAPIs() {
  const [bookings, setBookings] = useState<BookingAPI.BookingWithRelations[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all bookings
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await BookingAPI.getBookings();
      setBookings(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Error fetching bookings");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single booking by ID
  const fetchBookingById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      return await BookingAPI.getBookingById(id);
    } catch (err: any) {
      setError(err.message || `Error fetching booking ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create booking
  const createBooking = useCallback(
    async (bookingInput: BookingAPI.BookingInput) => {
      setLoading(true);
      setError(null);
      try {
        const newBooking = await BookingAPI.createBooking(bookingInput);
        setBookings((prev) => [...prev, newBooking]);
        return newBooking;
      } catch (err: any) {
        setError(err.message || "Error creating booking");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update booking
  const updateBooking = useCallback(
    async (id: number, updates: Partial<BookingAPI.BookingInput>) => {
      setLoading(true);
      setError(null);
      try {
        const updated = await BookingAPI.updateBooking(id, updates);
        setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
        return updated;
      } catch (err: any) {
        setError(err.message || `Error updating booking ${id}`);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete booking
  const deleteBooking = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await BookingAPI.deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || `Error deleting booking ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    fetchBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
  };
}
