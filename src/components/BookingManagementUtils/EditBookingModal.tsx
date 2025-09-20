// File: src/components/BookingManagementUtils/EditBookingModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormLabel,
  Box,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { BookingWithRelations, BookingInput } from "../../api/BookingAPIs";

// Local type for dynamic arrays
type RelatedDataKeys = keyof BookingInput["relatedData"];

interface EditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingWithRelations;
  onSave: (updatedBooking: BookingInput) => void;
}

export const EditBookingModal: React.FC<EditBookingModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSave,
}) => {
  // Prepare form state for BookingInput
  const [formData, setFormData] = useState<BookingInput>({
    booking: {
      clientId: booking.clientId,
      travelDate: booking.travelDate,
      clientFinalPaymentDate: booking.clientFinalPaymentDate,
      supplierFinalPaymentDate: booking.supplierFinalPaymentDate,
      bookingDate: booking.bookingDate,
      invoicedDate: booking.invoicedDate,
      referenceCode: booking.referenceCode,
      amount: booking.amount,
      notes: booking.notes,
      invoiced: booking.invoiced,
      paid: booking.paid,
      paymentDate: booking.paymentDate,
      dateCreated: booking.dateCreated,
    },
    relatedData: {
      confirmations: booking.confirmations.map(
        ({ confirmationNumber, supplier }) => ({ confirmationNumber, supplier })
      ),
      personDetails: booking.personDetails.map(({ name, dateOfBirth }) => ({
        name,
        dateOfBirth,
      })),
      significantDates: booking.significantDates.map(({ date }) => ({ date })),
      emailAddresses: booking.emailAddresses.map(({ email }) => ({ email })),
      phoneNumbers: booking.phoneNumbers.map(({ phone }) => ({ phone })),
    },
  });

  // Generic handler for simple booking fields
  const handleBookingChange = <K extends keyof BookingInput["booking"]>(
    field: K,
    value: BookingInput["booking"][K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      booking: { ...prev.booking, [field]: value },
    }));
  };

  // Generic handler for related data arrays
  const handleArrayChange = <K extends RelatedDataKeys>(
    arrayKey: K,
    index: number,
    field: keyof BookingInput["relatedData"][K][number],
    value: any
  ) => {
    setFormData((prev) => {
      const arr = [...prev.relatedData[arrayKey]];
      arr[index] = { ...arr[index], [field]: value };
      return {
        ...prev,
        relatedData: { ...prev.relatedData, [arrayKey]: arr },
      };
    });
  };

  const handleAddItem = <K extends RelatedDataKeys>(
    arrayKey: K,
    newItem: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      relatedData: {
        ...prev.relatedData,
        [arrayKey]: [...prev.relatedData[arrayKey], newItem],
      },
    }));
  };

  const handleRemoveItem = <K extends RelatedDataKeys>(
    arrayKey: K,
    index: number
  ) => {
    setFormData((prev) => {
      const arr = [...prev.relatedData[arrayKey]];
      arr.splice(index, 1);
      return {
        ...prev,
        relatedData: { ...prev.relatedData, [arrayKey]: arr },
      };
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Booking</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormLabel>Reference Code</FormLabel>
            <Input
              value={formData.booking.referenceCode}
              onChange={(e) =>
                handleBookingChange("referenceCode", e.target.value)
              }
            />

            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              value={formData.booking.amount}
              onChange={(e) =>
                handleBookingChange("amount", Number(e.target.value))
              }
            />

            <FormLabel>Notes</FormLabel>
            <Input
              value={formData.booking.notes}
              onChange={(e) => handleBookingChange("notes", e.target.value)}
            />

            {/* Dynamic related arrays */}
            {Object.entries(formData.relatedData).map(([key, arr]) => (
              <Box key={key} borderWidth="1px" p={2} borderRadius="md">
                <strong>{key}</strong>
                {arr.map((item, index) => (
                  <HStack key={index} spacing={2} mt={2}>
                    {Object.entries(item).map(([field, value]) => (
                      <Input
                        key={field}
                        value={value as string | number}
                        placeholder={field}
                        onChange={(e) =>
                          handleArrayChange(
                            key as RelatedDataKeys,
                            index,
                            field as keyof typeof item,
                            e.target.value
                          )
                        }
                      />
                    ))}
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() =>
                        handleRemoveItem(key as RelatedDataKeys, index)
                      }
                    >
                      Remove
                    </Button>
                  </HStack>
                ))}
                <Button
                  size="sm"
                  mt={2}
                  onClick={() => {
                    const emptyItem = Object.fromEntries(
                      Object.keys(arr[0] || {}).map((k) => [k, ""])
                    );
                    handleAddItem(key as RelatedDataKeys, emptyItem);
                  }}
                >
                  Add {key.slice(0, -1)}
                </Button>
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
