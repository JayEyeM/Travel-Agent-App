// File path: TravelAgentApp/src/components/ClientManagmentUtils/ClientList.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useClientAPIs } from "../../hooks/useClientAPIs";
import { Client } from "../../api/ClientAPIs";

import SearchClients2 from "./SearchClients2";
import { useBrandColors } from "../generalUtils/theme";

const ClientList: React.FC = () => {
  const { clients, loading, error, fetchClients, createClient } =
    useClientAPIs();
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const navigate = useNavigate();
  const { secondary, primary, background, text, accent } = useBrandColors();

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Explicit type for newClient
  type NewClientInput = Omit<Client, "id" | "userId" | "dateCreated">;
  const [newClient, setNewClient] = useState<NewClientInput>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientPostalCode: "",
    clientStreetAddress: "",
    clientCity: "",
    clientProvince: "",
    clientCountry: "",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Initial fetch
  useEffect(() => {
    fetchClients();
  }, []);

  // Keep filtered list in sync with full client list
  useEffect(() => {
    const sorted = [...clients].sort((a, b) => b.dateCreated - a.dateCreated);
    setFilteredClients(sorted);
  }, [clients]);

  const handleSearch = (filtered: Client[]) => {
    setFilteredClients(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateClient = async () => {
    // Inline validation for required fields
    const errors: { [key: string]: string } = {};
    if (!newClient.clientName) errors.clientName = "Name is required";
    if (!newClient.clientEmail) errors.clientEmail = "Email is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    await createClient(newClient as NewClientInput); // ✅ Fixed typing

    // Reset form
    setNewClient({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientPostalCode: "",
      clientStreetAddress: "",
      clientCity: "",
      clientProvince: "",
      clientCountry: "",
      notes: "",
    });

    onClose();
    fetchClients(); // refresh list after creation
  };

  return (
    <Box w="100%" maxW="800px" mx="auto" mt={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <SearchClients2 clientData={clients} onSearch={handleSearch} />
        <Button color={background} bg={accent} onClick={onOpen}>
          + Add New Client
        </Button>
      </Box>

      {loading ? (
        <Box textAlign="center">
          <Spinner size="xl" />
          <Text mt={2}>Loading clients...</Text>
        </Box>
      ) : error ? (
        <Box textAlign="center">
          <Text color="red.500">Error: {error}</Text>
        </Box>
      ) : (
        <VStack spacing={3} mt={4} align="stretch">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <Box
                key={client.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={{ base: "left", md: "space-between" }}
                alignItems={{ base: "left", md: "center" }}
              >
                <Box>
                  <Text fontWeight="bold">{client.clientName}</Text>
                  <Text>{client.clientEmail}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Added on:{" "}
                    {new Date(client.dateCreated * 1000).toLocaleDateString()}
                  </Text>
                </Box>
                <Button
                  color={secondary}
                  onClick={() => navigate(`/clients/${client.id}`)}
                >
                  View Client
                </Button>
              </Box>
            ))
          ) : (
            <Text textAlign="center">No clients found.</Text>
          )}
        </VStack>
      )}

      {/* Modal for creating new client */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Client</ModalHeader>
          <ModalBody>
            <VStack spacing={3}>
              {[
                "clientName",
                "clientEmail",
                "clientPhone",
                "clientPostalCode",
                "clientStreetAddress",
                "clientCity",
                "clientProvince",
                "clientCountry",
                "notes",
              ].map((field) => (
                <FormControl key={field} isInvalid={!!formErrors[field]}>
                  <FormLabel>{field.replace(/([A-Z])/g, " $1")}</FormLabel>
                  <Input
                    name={field}
                    value={(newClient as any)[field] || ""}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field}`}
                  />
                  {formErrors[field] && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {formErrors[field]}
                    </Text>
                  )}
                </FormControl>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color={background} bg={accent} onClick={handleCreateClient}>
              Create Client
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ClientList;
