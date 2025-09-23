import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { newClientFormData } from "../generalUtils/interfaces";
import useClientData from "./UseClientDataHook";

interface EditClientFormProps {
  client: newClientFormData; // Current client data to be edited
  onCancel: () => void; // Callback to close the form/modal after submission or cancellation
}

const EditClientForm: React.FC<EditClientFormProps> = ({
  client,
  onCancel,
}) => {
  const [updatedClientData, setUpdatedClientData] = useState(client); // State to manage form inputs
  const { updateClient } = useClientData(); // Access the hook
  const toast = useToast();

  // Handle form input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    const fieldValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setUpdatedClientData((prevState) => ({
      ...prevState,
      [id]: fieldValue,
    }));
  };

  // Handle form submission for updating client
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    // Convert paymentDate to number if it exists and is a string
    const sanitizedData = {
      ...updatedClientData,
      paymentDate: updatedClientData.paymentDate
        ? new Date(updatedClientData.paymentDate).getTime()
        : undefined,
      finalPaymentDate: updatedClientData.finalPaymentDate
        ? new Date(updatedClientData.finalPaymentDate).getTime()
        : undefined,
      dateCreated: updatedClientData.dateCreated
        ? new Date(updatedClientData.dateCreated).getTime()
        : undefined,
    };

    try {
      await updateClient(client.id, sanitizedData); // Update the client using the hook

      // Success toast notification
      toast({
        title: "Client updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onCancel(); // Close the form/modal
    } catch (error) {
      console.error("Error updating client:", error);

      // Error toast notification
      toast({
        title: "Error updating client.",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={4}>
      <form onSubmit={handleUpdate}>
        <FormControl id="clientName">
          <FormLabel>Client Name</FormLabel>
          <Input
            type="text"
            id="clientName"
            value={updatedClientData.clientName}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="clientEmail">
          <FormLabel>Client Email</FormLabel>
          <Input
            type="email"
            id="clientEmail"
            value={updatedClientData.clientEmail}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="clientPhone">
          <FormLabel>Client Phone</FormLabel>
          <Input
            type="tel"
            id="clientPhone"
            value={updatedClientData.clientPhone}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="clientPostalCode">
          <FormLabel>Client Postal Code</FormLabel>
          <Input
            type="text"
            id="clientPostalCode"
            value={updatedClientData.clientPostalCode}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="clientStreetAddress">
          <FormLabel>Client Street Address</FormLabel>
          <Input
            type="text"
            id="clientStreetAddress"
            value={updatedClientData.clientStreetAddress}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="clientCity">
          <FormLabel>Client City</FormLabel>
          <Input
            type="text"
            id="clientCity"
            value={updatedClientData.clientCity}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="clientProvince">
          <FormLabel>Client Province</FormLabel>
          <Input
            type="text"
            id="clientProvince"
            value={updatedClientData.clientProvince}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="clientCountry">
          <FormLabel>Client Country</FormLabel>
          <Input
            type="text"
            id="clientCountry"
            value={updatedClientData.clientCountry}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="notes">
          <FormLabel>Notes</FormLabel>
          <Textarea
            id="notes"
            value={updatedClientData.notes}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="paymentDate">
          <FormLabel>Payment Date</FormLabel>
          <Input
            type="date"
            id="paymentDate"
            value={updatedClientData.paymentDate}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="finalPaymentDate">
          <FormLabel>Final Payment Date</FormLabel>
          <Input
            type="date"
            id="finalPaymentDate"
            value={updatedClientData.finalPaymentDate}
            onChange={handleChange}
          />
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          Save Changes
        </Button>
        <Button mt={4} ml={4} onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default EditClientForm;
