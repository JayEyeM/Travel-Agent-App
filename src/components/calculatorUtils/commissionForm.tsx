import { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Checkbox, Button, SimpleGrid, NumberInput, NumberInputField, Select, Divider, AbsoluteCenter, Text } from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';
import useBookingsData from '../bookingFormUtils/useBookingsData';
import useClientData from '../ClientManagmentUtils/UseClientDataHook';
import dayjs from 'dayjs';

// Interface for the commission form data
interface CommissionFormData {
  commissionId: number;
  clientName: string;
  supplier: string;
  bookingTravelDate: string;
  confirmationNumber: string;
  finalPaymentDate: string;
  rate: number;
  commission: number;
  commissionRateAmount: number;
  invoiced: boolean;
  paid: boolean;
  paymentDate: string;
}

const CommissionForm = () => {
  const { primary, background, secondary, accent, text } = useBrandColors();
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedBookingTravelDate, setSelectedBookingTravelDate] = useState<string | null>(null);
  const [selectedConfirmationNumber, setSelectedConfirmationNumber] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  const { getBookingsByClientId } = useBookingsData();
  const { clientData } = useClientData();

  // Initialize state with the CommissionFormData interface
  const [formData, setFormData] = useState<CommissionFormData>({
    commissionId: 0,
    clientName: '',
    supplier: '',
    bookingTravelDate: dayjs().format('YYYY-MM-DD'),
    confirmationNumber: '',
    finalPaymentDate: '',
    rate: 0,
    commission: 0,
    commissionRateAmount: 0,
    invoiced: false,
    paid: false,
    paymentDate: ''
  });

  // Fetch bookings whenever a client is selected
  useEffect(() => {
    if (selectedClientId !== null) {
      const loadBookings = () => {
        const bookingData = getBookingsByClientId(selectedClientId);
        setBookings(bookingData);
      };
      loadBookings();
    } else {
      setBookings([]); // Reset bookings if no client is selected
    }
  }, [selectedClientId, getBookingsByClientId]);

  // Fetch the booking's confirmation numbers whenever a booking travel date is selected
  useEffect(() => {
    if (selectedBookingTravelDate !== null) {
      const booking = bookings.find((b: any) => b.travelDate === selectedBookingTravelDate);
      if (booking) {
        setSelectedConfirmationNumber(''); // Reset to the placeholder value when a new booking is selected
      }
    } else {
      setSelectedConfirmationNumber(null);
    }
  }, [selectedBookingTravelDate, bookings]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  //handle client selection
  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    setSelectedClientId(selectedId);
  
    // Find the selected client and update formData
    const selectedClient = clientData.find(client => client.id === selectedId);
    setFormData(prevFormData => ({
      ...prevFormData,
      clientName: selectedClient ? selectedClient.clientName : '',
    }));
  };
  
  

  // Handle form submission - save to local storage
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Ensure finalPaymentDate is correctly included in formData
  const updatedFormData = {
    ...formData,
    bookingTravelDate: selectedBookingTravelDate ?? dayjs().format('YYYY-MM-DD'),
    finalPaymentDate: selectedBookingTravelDate ? bookings.find((b: any) => b.travelDate === selectedBookingTravelDate)?.supplierFinalPaymentDate ?? '' : ''
  };
  
  // Debugging: Check form data before saving
  console.log('Form Data Submitted:', updatedFormData);
  
  // Save to local storage
  localStorage.setItem('CommissionFormData', JSON.stringify(updatedFormData));
  
  // Reset form data and selected values
  setFormData({
    commissionId: 0,
    clientName: '',
    supplier: '',
    bookingTravelDate: dayjs().format('YYYY-MM-DD'),
    confirmationNumber: '',
    finalPaymentDate: '',
    rate: 0,
    commission: 0,
    commissionRateAmount: 0,
    invoiced: false,
    paid: false,
    paymentDate: ''
  });
  
  setSelectedClientId(null);
  setSelectedBookingTravelDate(null);
  setSelectedConfirmationNumber(null);
};

  
  

  //handle confirmation number change
  const handleConfirmationNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    const [confirmationNumber, supplier] = selectedOption.split(' : ');
  
    // Update state
    setSelectedConfirmationNumber(selectedOption);
    setFormData(prevFormData => ({
      ...prevFormData,
      confirmationNumber: confirmationNumber || '',
      supplier: supplier || 'Unknown Supplier'
    }));
  };
  
  
  
  
  

  // Effect to calculate commissionRateAmount
  useEffect(() => {
    const { rate, commission } = formData;
    if (rate > 0 && commission > 0) {
      const calculatedCommissionRateAmount = (rate / 100) * commission;
      setFormData(prevFormData => ({
        ...prevFormData,
        commissionRateAmount: calculatedCommissionRateAmount
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        commissionRateAmount: 0
      }));
    }
  }, [formData.rate, formData.commission]);

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
          {/* Client Selection */}
          <FormControl color={accent}>
            <FormLabel htmlFor='clientName'>Client Name</FormLabel>
            <Select
              boxShadow="0px 0px 5px 1px"
              outline={'1px solid'}
              outlineColor={accent}
              id='clientName'
              color={text}
              value={selectedClientId !== null ? selectedClientId : ''}
              onChange={handleClientChange}
            >
              <option value="">Select Client</option>
              {clientData.map(client => (
                <option key={client.id} value={client.id}>{client.clientName}</option>
              ))}
            </Select>

          </FormControl>

          {/* Booking Selection - Show only if a client is selected */}
          {selectedClientId && (
            <FormControl color={accent}>
              <FormLabel htmlFor='booking'>Booking</FormLabel>
              <Select
                outline={'1px solid'}
                outlineColor={accent}
                id='booking'
                color={text}
                boxShadow="0px 0px 5px 1px"
                value={selectedBookingTravelDate !== null ? selectedBookingTravelDate : ''}
                onChange={(e) => setSelectedBookingTravelDate(e.target.value)}
              >
                <option value="">Select Booking</option>
                {bookings.map((booking) => {
                  const localDate = dayjs(booking.travelDate).format('YYYY-MM-DD'); // Adjust format as needed
                  return (
                    <option key={booking.travelDate} value={booking.travelDate}>
                      Travel Date: {localDate}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          )}

          {/* Confirmation Number selection - show only if a booking travel date is selected */}
          {selectedBookingTravelDate && (
            <Box>
              <FormControl color={accent}>
                <FormLabel htmlFor='confirmationNumber'>Confirmation Number : Supplier</FormLabel>
                <Select
  outline={'1px solid'}
  outlineColor={accent}
  id='confirmationNumber'
  color={text}
  boxShadow="0px 0px 5px 1px"
  value={selectedConfirmationNumber || ''}
  onChange={handleConfirmationNumberChange}
>
  <option value="">Select Confirmation Number : Supplier</option>
  {bookings
    .find((b: any) => b.travelDate === selectedBookingTravelDate)?.confirmationNumbers?.map((confirmation: any) => {
      const booking = bookings.find((b: any) => b.travelDate === selectedBookingTravelDate);
      const supplier = booking?.confirmationNumbers.find((c: any) => c.confirmationNumber === confirmation.confirmationNumber)?.supplier || 'Unknown Supplier';
      return (
        <option key={confirmation.confirmationNumber} value={`${confirmation.confirmationNumber} : ${supplier}`}>
          {confirmation.confirmationNumber} : {supplier}
        </option>
      );
    })}
</Select>

              </FormControl>
            </Box>
          )}

          {/* Supplier's Final Payment Date */}
          {selectedBookingTravelDate && (
            <FormControl color={accent}>
              <FormLabel htmlFor='finalPaymentDate'>Supplier's Final Payment Date</FormLabel>
              <Input id='finalPaymentDate' color={text} type='date'
                     value={selectedBookingTravelDate ? bookings.find((b: any) => b.travelDate === selectedBookingTravelDate)?.supplierFinalPaymentDate ?? '' : ''}
                     onChange={handleChange} />
            </FormControl>
          )}

          {/* Booking Number Input */}
          {/* <FormControl color={accent}>
            <FormLabel htmlFor='bookingNumber'>Booking Number</FormLabel>
            <NumberInput defaultValue={0} precision={0}>
              <NumberInputField id='bookingNumber' color={text} value={formData.bookingNumber} onChange={handleChange} />
            </NumberInput>
          </FormControl> */}

          {/* Supplier Input */}
          {/* <FormControl color={accent}>
            <FormLabel htmlFor='supplier'>Supplier</FormLabel>
            <Input id='supplier' color={text} type='text' value={formData.supplier} onChange={handleChange} />
          </FormControl> */}

          <Box mt={{ base: 8, md: 10 }} position={"relative"}>
            <Divider />
            <AbsoluteCenter bg={background} px='4' w={{ base: '100%', md: 'auto' }} 
                            mt={{ base: 4, md: 0 }}>
            </AbsoluteCenter>
          </Box>

          <Box mt={{ base: 8, md: 10 }} position={"relative"}>
            <Divider />
            <AbsoluteCenter bg={background} px='4' w={{ base: '100%', md: 'auto' }} 
                            mt={{ base: 4, md: 0 }}>
            </AbsoluteCenter>
          </Box>

          {/* Commission Rate */}
          <FormControl color={accent}>
            <FormLabel htmlFor='rate'>Commission Rate Percentage (%)</FormLabel>
            <NumberInput defaultValue={0} precision={2} step={0.01}
            outline={'2px solid'}
            outlineColor={accent}
            borderRadius={'lg'}
            boxShadow="0px 0px 5px 1px gray"
            >
              <NumberInputField id='rate' color={text} value={formData.rate} onChange={handleChange} />
            </NumberInput>
          </FormControl>

          {/* Commission Amount */}
          <FormControl color={accent}>
            <FormLabel htmlFor='commission'>Commission Amount ($00.00)</FormLabel>
            <NumberInput defaultValue={0} precision={2} step={0.01}
             outline={'2px solid'}
             outlineColor={accent}
             borderRadius={'lg'}
             boxShadow="0px 0px 5px 1px gray"
            >
              <NumberInputField id='commission' color={text} value={formData.commission} onChange={handleChange} />
            </NumberInput>
          </FormControl>

          {/* Commission Rate Amount */}
          <FormControl color={secondary}>
            <FormLabel htmlFor='commissionRateAmount'>Commission Amount at {formData.rate}%</FormLabel>
            <Text id='commissionRateAmount' fontSize="xl" fontWeight={"bold"} color={secondary}>
              $ {formData.commissionRateAmount.toFixed(2)}
            </Text>
          </FormControl>

          {/* Invoice Checkbox */}
          <FormControl color={accent}>
            <FormLabel htmlFor='invoiced'>Invoiced</FormLabel>
            <Checkbox id='invoiced' isChecked={formData.invoiced} onChange={handleChange} />
          </FormControl>

          {/* Paid Checkbox */}
          <FormControl color={accent}>
            <FormLabel htmlFor='paid'>Paid</FormLabel>
            <Checkbox id='paid' isChecked={formData.paid} onChange={handleChange} />
          </FormControl>

          {/* Payment Date */}
          <FormControl color={accent}>
            <FormLabel htmlFor='paymentDate'>Payment Date</FormLabel>
            <Input id='paymentDate' color={text} type='date' value={formData.paymentDate} onChange={handleChange} />
          </FormControl>
        </SimpleGrid>

        <Button mt={4} colorScheme='blue' type='submit'>Submit</Button>
      </form>
    </Box>
  );
};

export default CommissionForm;
