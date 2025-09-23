// File path: src/components/BookingManagementUtils/BookingDetailsPage.tsx

import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Spinner,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { BookingWithRelations } from "../../api/BookingAPIs";
import { useBookingAPIs } from "../../hooks/useBookingAPIs";
import { useClientAPIs } from "../../hooks/useClientAPIs";
// import EditBookingModal from "./EditBookingModal";

const BookingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const bookingId = Number(id);
  const navigate = useNavigate();

  const { fetchBookingById, deleteBooking, loading, error } = useBookingAPIs();
  const { clients, fetchClients } = useClientAPIs();

  const [booking, setBooking] = useState<BookingWithRelations | null>(null);

  // Edit modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Delete confirmation modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  // Load booking
  useEffect(() => {
    const loadBooking = async () => {
      const fetched = await fetchBookingById(bookingId);
      if (fetched) setBooking(fetched);
    };
    loadBooking();
  }, [bookingId, fetchBookingById]);

  // Load all clients once
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Lookup client name based on booking.clientId
  const clientName = booking?.clientId
    ? clients.find((c) => c.id === booking.clientId)?.clientName ?? "Client"
    : "Client";

  const handleDelete = async () => {
    const success = await deleteBooking(bookingId);
    if (success) {
      navigate("/bookingManagement");
    }
  };

  // Robust date formatting
  function formatDate(ts: number | undefined | null): string {
    if (!ts) return "N/A";
    const d = new Date(ts);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!booking) return <Text>Booking not found.</Text>;

  return (
    <Box p={6}>
      {/* Header & Back Link */}
      <HStack justifyContent="space-between" mb={6}>
        <Heading>Booking Details for {clientName}</Heading>
        <Button as={RouterLink} to="/bookingManagement" variant="outline">
          Back to Bookings
        </Button>
      </HStack>

      <VStack
        align="start"
        spacing={4}
        p={4}
        border="1px solid"
        borderRadius="md"
        borderColor="gray.200"
      >
        {/* General Info */}
        <Box>
          <Heading size="md" mb={2}>
            General Information
          </Heading>
          <VStack align="start" spacing={1}>
            <Text>
              <strong>Reference Code:</strong> {booking.referenceCode}
            </Text>
            <Text>
              <strong>Amount:</strong> ${booking.amount.toFixed(2)}
            </Text>
            <Text>
              <strong>Notes:</strong> {booking.notes || "N/A"}
            </Text>
          </VStack>
        </Box>

        <Divider />

        {/* Dates */}
        <Box>
          <Heading size="md" mb={2}>
            Dates
          </Heading>
          <VStack align="start" spacing={1}>
            <Text>
              <strong>Travel Date:</strong> {formatDate(booking.travelDate)}
            </Text>
            <Text>
              <strong>Client Final Payment Date:</strong>{" "}
              {formatDate(booking.clientFinalPaymentDate)}
            </Text>
            <Text>
              <strong>Supplier Final Payment Date:</strong>{" "}
              {formatDate(booking.supplierFinalPaymentDate)}
            </Text>
            <Text>
              <strong>Booking Date:</strong> {formatDate(booking.bookingDate)}
            </Text>
            <Text>
              <strong>Invoiced Date:</strong> {formatDate(booking.invoicedDate)}
            </Text>
            <Text>
              <strong>Date Created:</strong> {formatDate(booking.dateCreated)}
            </Text>
          </VStack>
        </Box>

        <Divider />

        {/* Status */}
        <Box>
          <Heading size="md" mb={2}>
            Status
          </Heading>
          <VStack align="start" spacing={1}>
            <Text>
              <strong>Invoiced:</strong> {booking.invoiced ? "Yes" : "No"}
            </Text>
            <Text>
              <strong>Paid:</strong> {booking.paid ? "Yes" : "No"}
            </Text>
          </VStack>
        </Box>

        <Divider />

        {/* Confirmations */}
        <Box>
          <Heading size="md" mb={2}>
            Confirmations
          </Heading>
          {booking.confirmations.length > 0 ? (
            booking.confirmations.map((c) => (
              <Text key={c.id}>
                {c.confirmationNumber} ({c.supplier})
              </Text>
            ))
          ) : (
            <Text>No confirmations</Text>
          )}
        </Box>

        <Divider />

        {/* Travelers */}
        <Box>
          <Heading size="md" mb={2}>
            Travelers
          </Heading>
          {booking.personDetails.length > 0 ? (
            booking.personDetails.map((p) => (
              <Text key={p.id}>
                {p.name} (DOB: {formatDate(p.dateOfBirth)})
              </Text>
            ))
          ) : (
            <Text>No travelers</Text>
          )}
        </Box>

        <Divider />

        {/* Significant Dates */}
        <Box>
          <Heading size="md" mb={2}>
            Significant Dates
          </Heading>
          {booking.significantDates.length > 0 ? (
            booking.significantDates.map((d) => (
              <Text key={d.id}>{formatDate(d.date)}</Text>
            ))
          ) : (
            <Text>No significant dates</Text>
          )}
        </Box>

        <Divider />

        {/* Emails */}
        <Box>
          <Heading size="md" mb={2}>
            Emails
          </Heading>
          {booking.emailAddresses.length > 0 ? (
            booking.emailAddresses.map((e) => <Text key={e.id}>{e.email}</Text>)
          ) : (
            <Text>No emails</Text>
          )}
        </Box>

        <Divider />

        {/* Phone Numbers */}
        <Box>
          <Heading size="md" mb={2}>
            Phone Numbers
          </Heading>
          {booking.phoneNumbers.length > 0 ? (
            booking.phoneNumbers.map((p) => <Text key={p.id}>{p.phone}</Text>)
          ) : (
            <Text>No phone numbers</Text>
          )}
        </Box>
      </VStack>

      {/* Actions */}
      <HStack mt={6}>
        <Button colorScheme="blue" onClick={onOpen}>
          Edit
        </Button>
        <Button colorScheme="red" onClick={onDeleteOpen}>
          Delete
        </Button>
      </HStack>

      {/* Edit Modal */}
      {/* {booking && (
        <EditBookingModal
          isOpen={isOpen}
          onClose={onClose}
          booking={booking}
          setBooking={setBooking}
        />
      )} */}

      {/* Delete Confirmation */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Booking</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this booking? This action cannot
              be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef as any} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default BookingDetailsPage;
