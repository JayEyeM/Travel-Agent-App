// src/components/BookingManagementUtils/AddBookingModal.tsx
import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
  Textarea,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useClientAPIs } from "../../hooks/useClientAPIs";
import {
  BookingInput,
  EmailAddress,
  PhoneNumber,
  Confirmation,
  PersonDetail,
  SignificantDate,
} from "../../api/BookingAPIs";

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newBooking: BookingInput) => void;
}

export default function AddBookingModal({
  isOpen,
  onClose,
  onAdd,
}: AddBookingModalProps) {
  const { clients, fetchClients } = useClientAPIs();

  const [selectedClientId, setSelectedClientId] = useState<number | "">("");
  const [travelDate, setTravelDate] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [invoicedDate, setInvoicedDate] = useState("");
  const [clientFinalPaymentDate, setClientFinalPaymentDate] = useState("");
  const [supplierFinalPaymentDate, setSupplierFinalPaymentDate] = useState("");
  const [amount, setAmount] = useState<string>("0");
  const [invoiced, setInvoiced] = useState(false);
  const [paid, setPaid] = useState(false);
  const [notes, setNotes] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  // Repeatable sections
  const [emailAddresses, setEmailAddresses] = useState<EmailAddress[]>([
    { id: Date.now(), bookingId: 0, email: "" },
  ]);
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([
    { id: Date.now() + 1, bookingId: 0, phone: "" },
  ]);
  const [confirmations, setConfirmations] = useState<Confirmation[]>([
    { id: Date.now() + 2, bookingId: 0, confirmationNumber: "", supplier: "" },
  ]);
  const [personDetails, setPersonDetails] = useState<PersonDetail[]>([
    { id: Date.now() + 3, bookingId: 0, name: "", dateOfBirth: Date.now() },
  ]);
  const [significantDates, setSignificantDates] = useState<SignificantDate[]>([
    { id: Date.now() + 4, bookingId: 0, date: Date.now() },
  ]);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (isOpen) setReferenceCode(`BOOK${Math.floor(Math.random() * 100000)}`);
  }, [isOpen]);

  const handleSubmit = () => {
    if (!selectedClientId) return alert("Please select a client");

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return alert("Please enter a valid amount");

    const payload: BookingInput = {
      booking: {
        clientId: selectedClientId,
        travelDate: travelDate ? new Date(travelDate).getTime() : Date.now(),
        bookingDate: bookingDate ? new Date(bookingDate).getTime() : Date.now(),
        invoicedDate: invoicedDate
          ? new Date(invoicedDate).getTime()
          : Date.now(),
        clientFinalPaymentDate: clientFinalPaymentDate
          ? new Date(clientFinalPaymentDate).getTime()
          : Date.now(),
        supplierFinalPaymentDate: supplierFinalPaymentDate
          ? new Date(supplierFinalPaymentDate).getTime()
          : Date.now(),
        dateCreated: Date.now(),
        amount: parsedAmount,
        invoiced,
        paid,
        notes,
        referenceCode,
      },
      relatedData: {
        emailAddresses: emailAddresses.map((e) => ({
          ...e,
          id: Date.now() + Math.random(),
          bookingId: 0,
        })),
        phoneNumbers: phoneNumbers.map((p) => ({
          ...p,
          id: Date.now() + Math.random(),
          bookingId: 0,
        })),
        confirmations: confirmations.map((c) => ({
          ...c,
          id: Date.now() + Math.random(),
          bookingId: 0,
        })),
        personDetails: personDetails.map((p) => ({
          ...p,
          id: Date.now() + Math.random(),
          bookingId: 0,
          dateOfBirth: p.dateOfBirth
            ? new Date(p.dateOfBirth).getTime()
            : Date.now(),
        })),
        significantDates: significantDates.map((d) => ({
          ...d,
          id: Date.now() + Math.random(),
          bookingId: 0,
          date: d.date ? new Date(d.date).getTime() : Date.now(),
        })),
      },
    };

    onAdd(payload);
    onClose();
  };

  const addRow = <T,>(
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    emptyRow: T
  ) => {
    setState((prev) => [
      ...prev,
      { ...emptyRow, id: Date.now() + Math.random() },
    ]);
  };
  const removeRow = <T extends { id: number }>(
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    id: number
  ) => {
    setState((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Booking</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {/* Client Dropdown */}
            <FormControl>
              <FormLabel>Client</FormLabel>
              <Select
                placeholder="Select client"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(Number(e.target.value))}
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.clientName}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Reference Code */}
            <FormControl>
              <FormLabel>Reference Code</FormLabel>
              <Input value={referenceCode} isReadOnly />
            </FormControl>

            {/* Standard Dates */}
            <FormControl>
              <FormLabel>Travel Date</FormLabel>
              <Input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Booking Date</FormLabel>
              <Input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Invoiced Date</FormLabel>
              <Input
                type="date"
                value={invoicedDate}
                onChange={(e) => setInvoicedDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Client Final Payment Date</FormLabel>
              <Input
                type="date"
                value={clientFinalPaymentDate}
                onChange={(e) => setClientFinalPaymentDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Supplier Final Payment Date</FormLabel>
              <Input
                type="date"
                value={supplierFinalPaymentDate}
                onChange={(e) => setSupplierFinalPaymentDate(e.target.value)}
              />
            </FormControl>

            {/* Amount */}
            <FormControl>
              <FormLabel>Amount ($)</FormLabel>
              <NumberInput
                precision={2}
                step={0.01}
                value={amount}
                onChange={(valueAsString) => setAmount(valueAsString)}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>

            {/* Invoiced / Paid */}
            <FormControl>
              <FormLabel>Invoiced?</FormLabel>
              <Select
                value={invoiced ? "true" : "false"}
                onChange={(e) => setInvoiced(e.target.value === "true")}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Paid?</FormLabel>
              <Select
                value={paid ? "true" : "false"}
                onChange={(e) => setPaid(e.target.value === "true")}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </FormControl>

            {/* Notes */}
            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormControl>

            {/* Dynamic Sections */}
            {/* Emails */}
            <FormControl>
              <FormLabel>Email Addresses</FormLabel>
              {emailAddresses.map((e) => (
                <HStack key={e.id} mb={2}>
                  <Input
                    placeholder="Email"
                    value={e.email}
                    onChange={(ev) =>
                      setEmailAddresses((prev) =>
                        prev.map((x) =>
                          x.id === e.id ? { ...x, email: ev.target.value } : x
                        )
                      )
                    }
                  />
                  <IconButton
                    aria-label="Remove email"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={() => removeRow(setEmailAddresses, e.id)}
                  />
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                size="sm"
                onClick={() =>
                  addRow(setEmailAddresses, { id: 0, bookingId: 0, email: "" })
                }
              >
                Add Email
              </Button>
            </FormControl>

            {/* Phones */}
            <FormControl>
              <FormLabel>Phone Numbers</FormLabel>
              {phoneNumbers.map((p) => (
                <HStack key={p.id} mb={2}>
                  <Input
                    placeholder="Phone"
                    value={p.phone}
                    onChange={(ev) =>
                      setPhoneNumbers((prev) =>
                        prev.map((x) =>
                          x.id === p.id ? { ...x, phone: ev.target.value } : x
                        )
                      )
                    }
                  />
                  <IconButton
                    aria-label="Remove phone"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={() => removeRow(setPhoneNumbers, p.id)}
                  />
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                size="sm"
                onClick={() =>
                  addRow(setPhoneNumbers, { id: 0, bookingId: 0, phone: "" })
                }
              >
                Add Phone
              </Button>
            </FormControl>

            {/* Confirmations */}
            <FormControl>
              <FormLabel>Confirmations</FormLabel>
              {confirmations.map((c) => (
                <HStack key={c.id} mb={2}>
                  <Input
                    placeholder="Confirmation Number"
                    value={c.confirmationNumber}
                    onChange={(ev) =>
                      setConfirmations((prev) =>
                        prev.map((x) =>
                          x.id === c.id
                            ? { ...x, confirmationNumber: ev.target.value }
                            : x
                        )
                      )
                    }
                  />
                  <Input
                    placeholder="Supplier"
                    value={c.supplier}
                    onChange={(ev) =>
                      setConfirmations((prev) =>
                        prev.map((x) =>
                          x.id === c.id
                            ? { ...x, supplier: ev.target.value }
                            : x
                        )
                      )
                    }
                  />
                  <IconButton
                    aria-label="Remove confirmation"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={() => removeRow(setConfirmations, c.id)}
                  />
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                size="sm"
                onClick={() =>
                  addRow(setConfirmations, {
                    id: 0,
                    bookingId: 0,
                    confirmationNumber: "",
                    supplier: "",
                  })
                }
              >
                Add Confirmation
              </Button>
            </FormControl>

            {/* Person Details */}
            <FormControl>
              <FormLabel>Person Details</FormLabel>
              {personDetails.map((p) => (
                <HStack key={p.id} mb={2}>
                  <Input
                    placeholder="Name"
                    value={p.name}
                    onChange={(ev) =>
                      setPersonDetails((prev) =>
                        prev.map((x) =>
                          x.id === p.id ? { ...x, name: ev.target.value } : x
                        )
                      )
                    }
                  />
                  <Input
                    type="date"
                    value={new Date(p.dateOfBirth).toISOString().slice(0, 10)}
                    onChange={(ev) =>
                      setPersonDetails((prev) =>
                        prev.map((x) =>
                          x.id === p.id
                            ? {
                                ...x,
                                dateOfBirth: new Date(
                                  ev.target.value
                                ).getTime(),
                              }
                            : x
                        )
                      )
                    }
                  />
                  <IconButton
                    aria-label="Remove person"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={() => removeRow(setPersonDetails, p.id)}
                  />
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                size="sm"
                onClick={() =>
                  addRow(setPersonDetails, {
                    id: 0,
                    bookingId: 0,
                    name: "",
                    dateOfBirth: Date.now(),
                  })
                }
              >
                Add Person
              </Button>
            </FormControl>

            {/* Significant Dates */}
            <FormControl>
              <FormLabel>Significant Dates</FormLabel>
              {significantDates.map((d) => (
                <HStack key={d.id} mb={2}>
                  <Input
                    type="date"
                    value={new Date(d.date).toISOString().slice(0, 10)}
                    onChange={(ev) =>
                      setSignificantDates((prev) =>
                        prev.map((x) =>
                          x.id === d.id
                            ? {
                                ...x,
                                date: new Date(ev.target.value).getTime(),
                              }
                            : x
                        )
                      )
                    }
                  />
                  <IconButton
                    aria-label="Remove date"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={() => removeRow(setSignificantDates, d.id)}
                  />
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                size="sm"
                onClick={() =>
                  addRow(setSignificantDates, {
                    id: 0,
                    bookingId: 0,
                    date: Date.now(),
                  })
                }
              >
                Add Date
              </Button>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add Booking
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
