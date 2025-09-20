// src/components/BookingManagementUtils/BookingList.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  HStack,
} from "@chakra-ui/react";
import AddBookingModal from "./AddBookingModal";
import { EditBookingModal } from "./EditBookingModal";
import { useBookingAPIs } from "../../hooks/useBookingAPIs";
import { BookingWithRelations, BookingInput } from "../../api/BookingAPIs";
import { useNavigate } from "react-router-dom";

export default function BookingList() {
  const {
    bookings,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    loading,
    error,
  } = useBookingAPIs();

  const [filteredBookings, setFilteredBookings] = useState<
    BookingWithRelations[]
  >([]);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingWithRelations | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Load bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Update filteredBookings whenever bookings change
  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  // Search handler
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = bookings.filter((b) =>
      b.referenceCode.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  // Add booking handler
  const handleAdd = async (newBookingPayload: BookingInput) => {
    const created = await createBooking(newBookingPayload);
    if (!created) alert("Failed to add booking");
    else setAddModalOpen(false);
  };

  // Delete booking handler
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    const success = await deleteBooking(id);
    if (!success) alert("Failed to delete booking");
  };

  // Edit booking handler
  const handleEdit = (booking: BookingWithRelations) => {
    setSelectedBooking(booking);
    setEditModalOpen(true);
  };

  return (
    <Box p={4}>
      <HStack mb={4} spacing={4}>
        <Input
          placeholder="Search by reference code..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button colorScheme="green" onClick={() => setAddModalOpen(true)}>
          Add New Booking
        </Button>
      </HStack>

      <Heading mb={4}>Bookings</Heading>

      {loading && <Box mb={2}>Loading bookings...</Box>}
      {error && (
        <Box mb={2} color="red.500">
          {error}
        </Box>
      )}

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Reference</Th>
            <Th>Client ID</Th>
            <Th>Travel Date</Th>
            <Th>Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredBookings.map((b) => (
            <Tr key={b.id}>
              <Td>{b.referenceCode}</Td>
              <Td>{b.clientId}</Td>
              <Td>{new Date(b.travelDate).toLocaleDateString()}</Td>
              <Td>{b.amount}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={() => handleEdit(b)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  mr={2}
                  colorScheme="blue"
                  onClick={() => navigate(`/bookings/${b.id}`)}
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(b.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedBooking && (
        <EditBookingModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          booking={selectedBooking}
          onSave={async (updates: BookingInput) => {
            const updated = await updateBooking(selectedBooking.id, updates);
            if (!updated) alert("Failed to update booking");
            setEditModalOpen(false);
          }}
        />
      )}

      <AddBookingModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAdd}
      />
    </Box>
  );
}
