// File path: src/components/ClientManagmentUtils/ClientDetailsPage.tsx

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
  Link,
} from "@chakra-ui/react";
import { Client } from "../../api/ClientAPIs";
import { useClientAPIs } from "../../hooks/useClientAPIs";
import EditClientModal from "./EditClientModal";

const ClientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  const navigate = useNavigate();

  const { fetchClientById, deleteClient, loading, error } = useClientAPIs();
  const [client, setClient] = useState<Client | null>(null);

  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Delete confirmation
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const loadClient = async () => {
      const fetched = await fetchClientById(clientId);
      if (fetched) setClient(fetched);
    };
    loadClient();
  }, [clientId, fetchClientById]);

  const handleDelete = async () => {
    const success = await deleteClient(clientId);
    if (success) {
      navigate("/clientManagement");
    }
  };

  const formatDate = (ts?: number) =>
    ts ? new Date(ts).toLocaleDateString() : "N/A";

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!client) return <Text>Client not found.</Text>;

  return (
    <Box p={6}>
      {/* Header & Back Link */}
      <HStack justifyContent="space-between" mb={6}>
        <Heading>Client Details</Heading>
        <Button as={RouterLink} to="/clientManagement" variant="outline">
          Back to Clients
        </Button>
      </HStack>

      {/* Client Info */}
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
              <strong>Name:</strong> {client.clientName}
            </Text>
            <Text>
              <strong>Email:</strong> {client.clientEmail}
            </Text>
            <Text>
              <strong>Phone:</strong> {client.clientPhone}
            </Text>
            <Text>
              <strong>Notes:</strong> {client.notes || "N/A"}
            </Text>
          </VStack>
        </Box>

        <Divider />

        {/* Address */}
        <Box>
          <Heading size="md" mb={2}>
            Address
          </Heading>
          <VStack align="start" spacing={1}>
            <Text>
              <strong>Street:</strong> {client.clientStreetAddress}
            </Text>
            <Text>
              <strong>City:</strong> {client.clientCity}
            </Text>
            <Text>
              <strong>Province:</strong> {client.clientProvince}
            </Text>
            <Text>
              <strong>Postal Code:</strong> {client.clientPostalCode}
            </Text>
            <Text>
              <strong>Country:</strong> {client.clientCountry}
            </Text>
          </VStack>
        </Box>

        <Divider />

        {/* Payment Info */}
        <Box>
          <Heading size="md" mb={2}>
            Payment Information
          </Heading>
          <VStack align="start" spacing={1}>
            <Text>
              <strong>Payment Date:</strong> {formatDate(client.paymentDate)}
            </Text>
            <Text>
              <strong>Final Payment Date:</strong>{" "}
              {formatDate(client.finalPaymentDate)}
            </Text>
            <Text>
              <strong>Date Created:</strong> {formatDate(client.dateCreated)}
            </Text>
          </VStack>
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
      <EditClientModal
        isOpen={isOpen}
        onClose={onClose}
        client={client}
        setClient={setClient}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Client</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete {client.clientName}? This action
              cannot be undone.
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

export default ClientDetailsPage;
