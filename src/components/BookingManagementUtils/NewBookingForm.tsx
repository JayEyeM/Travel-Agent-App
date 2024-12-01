import React, { useState } from 'react';
import {
  Box,
  Divider,
  AbsoluteCenter,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Checkbox,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';
import dayjs from 'dayjs';
import { bookingFormData } from '../generalUtils/interfaces';
import { postData } from '../generalUtils/APIs';

const NewBookingForm: React.FC = () => {
  const { primary, background, secondary } = useBrandColors();

  // Initialize state with the bookingFormData interface
  const [formData, setFormData] = useState<bookingFormData>({
    id: 0, // Placeholder; the backend will generate the ID
    travelDate: '',
    clientFinalPaymentDate: '',
    supplierFinalPaymentDate: '',
    bookingDate: dayjs().format('YYYY-MM-DD'),
    invoicedDate: '',
    confirmationNumbers: [{ confirmationNumber: '', supplier: '' }],
    namesDateOfBirths: [{ name: '', dateOfBirth: '' }],
    mailingAddress: '',
    phoneNumbers: [''],
    emailAddresses: [''],
    significantDates: [''],
    bookingId: dayjs().toISOString(),
    amount: 0,
    notes: '',
    invoiced: false,
    paid: false,
    paymentDate: '',
    dateCreated: dayjs().format('YYYY-MM-DD'),
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field?: string, index?: number) => {
    const { id, value } = e.target;

    // Handling dynamic updates for nested arrays (e.g., confirmationNumbers, phoneNumbers)
    if (field && typeof index === 'number') {
      setFormData((prevState) => ({
        ...prevState,
        [field]: prevState[field].map((item: any, i: number) =>
          i === index ? { ...item, [id]: value } : item
        ),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    try {
      const result = await postData<bookingFormData>('bookings', formData);
      console.log('Server response:', result);

      // Reset form data after successful submission
      setFormData({
        id: 0, // Placeholder; the backend will generate the ID
        travelDate: '',
        clientFinalPaymentDate: '',
        supplierFinalPaymentDate: '',
        bookingDate: dayjs().format('YYYY-MM-DD'),
        invoicedDate: '',
        confirmationNumbers: [{ confirmationNumber: '', supplier: '' }],
        namesDateOfBirths: [{ name: '', dateOfBirth: '' }],
        mailingAddress: '',
        phoneNumbers: [''],
        emailAddresses: [''],
        significantDates: [''],
        bookingId: dayjs().toISOString(),
        amount: 0,
        notes: '',
        invoiced: false,
        paid: false,
        paymentDate: '',
        dateCreated: dayjs().format('YYYY-MM-DD'),
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <Box
      p={10}
      mt={4}
      borderRadius="lg"
      outline="2px solid"
      outlineColor={primary}
      bg={background}
    >
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl id="travelDate" isRequired>
            <FormLabel>Travel Date</FormLabel>
            <Input
              type="date"
              id="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="clientFinalPaymentDate" isRequired>
            <FormLabel>Client Final Payment Date</FormLabel>
            <Input
              type="date"
              id="clientFinalPaymentDate"
              value={formData.clientFinalPaymentDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="supplierFinalPaymentDate" isRequired>
            <FormLabel>Supplier Final Payment Date</FormLabel>
            <Input
              type="date"
              id="supplierFinalPaymentDate"
              value={formData.supplierFinalPaymentDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="bookingDate" isRequired>
            <FormLabel>Booking Date</FormLabel>
            <Input
              type="date"
              id="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="invoicedDate">
            <FormLabel>Invoiced Date</FormLabel>
            <Input
              type="date"
              id="invoicedDate"
              value={formData.invoicedDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="amount" isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </FormControl>

          {/* Confirmation Numbers */}
          {formData.confirmationNumbers.map((confirmation, index) => (
            <VStack key={index} spacing={4}>
              <FormControl id={`confirmationNumber-${index}`} isRequired>
                <FormLabel>Confirmation Number</FormLabel>
                <Input
                  type="text"
                  value={confirmation.confirmationNumber}
                  onChange={(e) => handleChange(e, 'confirmationNumbers', index)}
                />
              </FormControl>

              <FormControl id={`supplier-${index}`} isRequired>
                <FormLabel>Supplier</FormLabel>
                <Input
                  type="text"
                  value={confirmation.supplier}
                  onChange={(e) => handleChange(e, 'confirmationNumbers', index)}
                />
              </FormControl>
            </VStack>
          ))}

          {/* Names and Date of Births */}
          {formData.namesDateOfBirths.map((item, index) => (
            <VStack key={index} spacing={4}>
              <FormControl id={`name-${index}`} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(e, 'namesDateOfBirths', index)}
                />
              </FormControl>

              <FormControl id={`dateOfBirth-${index}`} isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  value={item.dateOfBirth}
                  onChange={(e) => handleChange(e, 'namesDateOfBirths', index)}
                />
              </FormControl>
            </VStack>
          ))}

          <FormControl id="mailingAddress" isRequired>
            <FormLabel>Mailing Address</FormLabel>
            <Textarea
              id="mailingAddress"
              value={formData.mailingAddress}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="phoneNumbers" isRequired>
            <FormLabel>Phone Numbers</FormLabel>
            <Input
              type="text"
              id="phoneNumbers"
              value={formData.phoneNumbers.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phoneNumbers: e.target.value.split(',').map((num) => num.trim()),
                }))
              }
              placeholder="Comma-separated phone numbers"
            />
          </FormControl>

          <FormControl id="emailAddresses" isRequired>
            <FormLabel>Email Addresses</FormLabel>
            <Input
              type="text"
              id="emailAddresses"
              value={formData.emailAddresses.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  emailAddresses: e.target.value.split(',').map((email) => email.trim()),
                }))
              }
              placeholder="Comma-separated email addresses"
            />
          </FormControl>

          <FormControl id="significantDates">
            <FormLabel>Significant Dates</FormLabel>
            <Input
              type="text"
              id="significantDates"
              value={formData.significantDates.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  significantDates: e.target.value.split(',').map((date) => date.trim()),
                }))
              }
              placeholder="Comma-separated dates"
            />
          </FormControl>

          <FormControl id="notes">
            <FormLabel>Notes</FormLabel>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </FormControl>

          {/* Invoiced and Paid */}
          <FormControl id="invoiced" display="flex" alignItems="center">
            <Checkbox
              id="invoiced"
              isChecked={formData.invoiced}
              onChange={(e) => setFormData({ ...formData, invoiced: e.target.checked })}
            />
            <FormLabel htmlFor="invoiced" ml={2}>Invoiced</FormLabel>
          </FormControl>

          <FormControl id="paid" display="flex" alignItems="center">
            <Checkbox
              id="paid"
              isChecked={formData.paid}
              onChange={(e) => setFormData({ ...formData, paid: e.target.checked })}
            />
            <FormLabel htmlFor="paid" ml={2}>Paid</FormLabel>
          </FormControl>

          <FormControl id="paymentDate" isRequired>
            <FormLabel>Payment Date</FormLabel>
            <Input
              type="date"
              id="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="dateCreated" isRequired>
            <FormLabel>Date Created</FormLabel>
            <Input
              type="date"
              id="dateCreated"
              value={formData.dateCreated}
              onChange={handleChange}
              readOnly
            />
          </FormControl>
        </SimpleGrid>

        <Divider mt={6} />

        <AbsoluteCenter top="90%" left="50%" transform="translate(-50%, -50%)">
          <Button
            colorScheme="teal"
            mt={6}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </AbsoluteCenter>
      </form>
    </Box>
  );
};

export default NewBookingForm;
