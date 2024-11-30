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
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { useBrandColors } from '../generalUtils/theme';
import dayjs from 'dayjs';
import { bookingFormData } from '../generalUtils/interfaces';
import { postData } from '../generalUtils/APIs';

// Generate unique ID
const generateUniqueBookingId = () => {
  const bookingList = localStorage.getItem('BookingList');
  if (bookingList === null || bookingList === '') {
    return 1;
  } else {
    const bookings = JSON.parse(bookingList);
    if (bookings.length === 0) {
      return 1;
    } else {
      const highestId = Math.max(...bookings.map((booking: bookingFormData) => booking.id));
      return highestId + 1;
    }
  }
};

const NewBookingForm: React.FC = () => {
  const { primary, background, secondary } = useBrandColors();

  // Initialize state with the bookingFormData interface
  const [formData, setFormData] = useState<bookingFormData>({
    id: generateUniqueBookingId(),
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
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field?: string, index?: number) => {
    const { id, value } = e.target;

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

    const existingBookings = JSON.parse(localStorage.getItem('BookingList') || '[]');
    const updatedBookings = Array.isArray(existingBookings) ? [...existingBookings, formData] : [formData];

    localStorage.setItem('BookingList', JSON.stringify(updatedBookings));

    console.log('Form Data Submitted:', formData);

    try {
      const result = await postData<bookingFormData>('bookings', formData);
      console.log('Server response:', result);

      setFormData({
        id: generateUniqueBookingId(),
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
      outlineColor="white"
      bg={background}
    >
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl id="travelDate">
            <FormLabel>Travel Date</FormLabel>
            <Input type="date" id="travelDate" value={formData.travelDate} onChange={handleChange} />
          </FormControl>

          <FormControl id="clientFinalPaymentDate">
            <FormLabel>Client Final Payment Date</FormLabel>
            <Input
              type="date"
              id="clientFinalPaymentDate"
              value={formData.clientFinalPaymentDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="supplierFinalPaymentDate">
            <FormLabel>Supplier Final Payment Date</FormLabel>
            <Input
              type="date"
              id="supplierFinalPaymentDate"
              value={formData.supplierFinalPaymentDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="invoicedDate">
            <FormLabel>Invoiced Date</FormLabel>
            <Input type="date" id="invoicedDate" value={formData.invoicedDate} onChange={handleChange} />
          </FormControl>

          <FormControl id="mailingAddress">
            <FormLabel>Mailing Address</FormLabel>
            <Textarea id="mailingAddress" value={formData.mailingAddress} onChange={handleChange} />
          </FormControl>

          <FormControl id="phoneNumbers">
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

          <FormControl id="emailAddresses">
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
        </SimpleGrid>

        <Box mt={8}>
          <Divider />
          <AbsoluteCenter bg={background} px="4" w={{ base: '100%', md: 'auto' }} mt={4}>
            <Text color={secondary} fontSize="sm">
              The fields below for Booking ID and Date Created are automatically generated.
            </Text>
          </AbsoluteCenter>
        </Box>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button type="submit" colorScheme="blue">
            Add Booking
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewBookingForm;
