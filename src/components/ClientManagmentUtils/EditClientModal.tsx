// File path: src/components/ClientManagmentUtils/EditClientModal.tsx

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Client } from "../../api/ClientAPIs";
import { useClientAPIs } from "../../hooks/useClientAPIs";

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
  setClient: (client: Client) => void;
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  isOpen,
  onClose,
  client,
  setClient,
}) => {
  const [formData, setFormData] = useState<Partial<Client>>(client);
  const { updateClient } = useClientAPIs();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const updated = await updateClient(client.id, formData);
    if (updated) {
      setClient(updated);
      onClose();
    }
  };

  // Helper to format Unix timestamp to readable date
  const formatDate = (ts?: number) =>
    ts ? new Date(ts).toLocaleDateString() : "N/A";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Client</ModalHeader>
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Name</FormLabel>
            <Input
              name="clientName"
              value={formData.clientName || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Email</FormLabel>
            <Input
              name="clientEmail"
              value={formData.clientEmail || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Phone</FormLabel>
            <Input
              name="clientPhone"
              value={formData.clientPhone || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Postal Code</FormLabel>
            <Input
              name="clientPostalCode"
              value={formData.clientPostalCode || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Street Address</FormLabel>
            <Input
              name="clientStreetAddress"
              value={formData.clientStreetAddress || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>City</FormLabel>
            <Input
              name="clientCity"
              value={formData.clientCity || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Province</FormLabel>
            <Input
              name="clientProvince"
              value={formData.clientProvince || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Country</FormLabel>
            <Input
              name="clientCountry"
              value={formData.clientCountry || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Notes</FormLabel>
            <Input
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Payment Date</FormLabel>
            <Input
              name="paymentDate"
              type="date"
              value={
                formData.paymentDate
                  ? new Date(formData.paymentDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentDate: e.target.value
                    ? new Date(e.target.value).getTime()
                    : undefined,
                })
              }
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Final Payment Date</FormLabel>
            <Input
              name="finalPaymentDate"
              type="date"
              value={
                formData.finalPaymentDate
                  ? new Date(formData.finalPaymentDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  finalPaymentDate: e.target.value
                    ? new Date(e.target.value).getTime()
                    : undefined,
                })
              }
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Date Created</FormLabel>
            <Text>{formatDate(client.dateCreated)}</Text>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditClientModal;
