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
import { useBookingAPIs } from "../../hooks/useBookingAPIs";
import { BookingWithRelations, BookingInput } from "../../api/BookingAPIs";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function BookingList() {
  const { bookings, fetchBookings, createBooking, loading, error } =
    useBookingAPIs();

  const [filteredBookings, setFilteredBookings] = useState<
    BookingWithRelations[]
  >([]);
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
              <Td>${b.amount.toFixed(2)}</Td>
              <Td>
                <Button
                  as={RouterLink}
                  to={`/bookings/${b.id}`}
                  size="sm"
                  colorScheme="blue"
                >
                  View Details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AddBookingModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAdd}
      />
    </Box>
  );
}
