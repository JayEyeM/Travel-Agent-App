// import React, { useState } from 'react';
// import { Box, Input, FormControl, FormLabel, Button, IconButton, useToast } from '@chakra-ui/react';
// import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
// import ClosableBox2 from '../generalUtils/ClosableBox2';
// import { bookingFormData } from '../generalUtils/interfaces';
// import useBookingsData from '../bookingFormUtils/useBookingsData';
// import { BASE_URL } from '../generalUtils/APIs';

// interface BookingFormProps {
//   clientId: number;
// }

// const BookingForm: React.FC<BookingFormProps> = ({ clientId }) => {
//   const [formData, setFormData] = useState<bookingFormData>({
//     id: clientId,
//     travelDate: '',
//     clientFinalPaymentDate: '',
//     supplierFinalPaymentDate: '',
//     bookingDate: '',
//     invoicedDate: '',
//     confirmationNumbers: [{ confirmationNumber: '', supplier: '' }],
//     namesDateOfBirths: [{ name: '', dateOfBirth: '' }],
//     mailingAddress: '',
//     phoneNumbers: [''],
//     emailAddresses: [''],
//     significantDates: [''],
//     bookingId: '',
//   });

//   const toast = useToast();
//   const { saveBooking } = useBookingsData();

//   // Function to handle adding a new booking
//   const handleAddBooking = async () => {
//     const newBooking = { ...formData, bookingId: new Date().toISOString() };

//     // Save booking to backend (POST request)
//     try {
//       const response = await fetch(`${BASE_URL}/bookings`, {  
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newBooking),
//       });

//       if (response.ok) {
//         const result = await response.json();

//         saveBooking(clientId, newBooking);  // Optionally save it locally

//         toast({
//           title: 'Booking added to client.',
//           status: 'success',
//           duration: 2000,
//           isClosable: true,
//         });

//         // Reset form data
//         setFormData({
//           id: clientId,
//           travelDate: '',
//           clientFinalPaymentDate: '',
//           supplierFinalPaymentDate: '',
//           bookingDate: '',
//           invoicedDate: '',
//           confirmationNumbers: [{ confirmationNumber: '', supplier: '' }],
//           namesDateOfBirths: [{ name: '', dateOfBirth: '' }],
//           mailingAddress: '',
//           phoneNumbers: [''],
//           emailAddresses: [''],
//           significantDates: [''],
//           bookingId: '',
//         });
//       } else {
//         throw new Error('Failed to add booking');
//       }
//     } catch (error: unknown) {
//   // Type assertion to treat 'error' as an Error object
//   if (error instanceof Error) {
//     toast({
//       title: 'Error adding booking.',
//       description: error.message,  // Now TypeScript knows 'error' has a 'message' property
//       status: 'error',
//       duration: 2000,
//       isClosable: true,
//     });
//   } else {
//     toast({
//       title: 'Error adding booking.',
//       description: 'An unknown error occurred.',
//       status: 'error',
//       duration: 2000,
//       isClosable: true,
//     });
//   }
// };
//   }

//   // Handle changes in form fields
//   const handleArrayChange = (
//     field: keyof bookingFormData,
//     index: number,
//     value: string,
//     subField?: string
//   ) => {
//     const updatedArray = [...(formData[field] as any)];
//     if (subField) {
//       (updatedArray[index] as any)[subField] = value;
//     } else {
//       updatedArray[index] = value;
//     }
//     setFormData({ ...formData, [field]: updatedArray });
//   };

//   const handleAddField = (field: keyof bookingFormData, defaultValue: any) => {
//     const updatedArray = [...(formData[field] as any), defaultValue];
//     setFormData({ ...formData, [field]: updatedArray });
//   };

//   const handleRemoveField = (field: keyof bookingFormData, index: number) => {
//     const updatedArray = [...(formData[field] as any)];
//     updatedArray.splice(index, 1);
//     setFormData({ ...formData, [field]: updatedArray });
//   };

//   return (
//     <ClosableBox2
//       title="Booking Form"
//       buttonText="Add Booking"
//       icon={<AddIcon />}
//       onOpen={() => {}}
//       onClose={() => {}}
//       children={
//         <Box>
//           {/* Static form fields */}
//           <FormControl>
//             <FormLabel>Travel Date</FormLabel>
//             <Input
//               type="date"
//               placeholder="Travel Date"
//               value={formData.travelDate}
//               onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Client Final Payment Date</FormLabel>
//             <Input
//               type="date"
//               placeholder="Client Final Payment Date"
//               value={formData.clientFinalPaymentDate}
//               onChange={(e) => setFormData({ ...formData, clientFinalPaymentDate: e.target.value })}
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Supplier Final Payment Date</FormLabel>
//             <Input
//               type="date"
//               placeholder="Supplier Final Payment Date"
//               value={formData.supplierFinalPaymentDate}
//               onChange={(e) => setFormData({ ...formData, supplierFinalPaymentDate: e.target.value })}
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Booking Date</FormLabel>
//             <Input
//               type="date"
//               placeholder="Booking Date"
//               value={formData.bookingDate}
//               onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Invoiced Date</FormLabel>
//             <Input
//               type="date"
//               placeholder="Invoiced Date"
//               value={formData.invoicedDate}
//               onChange={(e) => setFormData({ ...formData, invoicedDate: e.target.value })}
//             />
//           </FormControl>

//           {/* Dynamic form fields */}
//           <FormControl>
//             <FormLabel>Confirmation Number/Supplier</FormLabel>
//             {formData.confirmationNumbers.map((entry, index) => (
//               <Box key={index} mb={2}>
//                 <Input
//                   type="text"
//                   placeholder="Confirmation Number"
//                   value={entry.confirmationNumber}
//                   onChange={(e) => handleArrayChange('confirmationNumbers', index, e.target.value, 'confirmationNumber')}
//                 />
//                 <Input
//                   type="text"
//                   placeholder="Supplier"
//                   value={entry.supplier}
//                   onChange={(e) => handleArrayChange('confirmationNumbers', index, e.target.value, 'supplier')}
//                   mb={1}
//                 />
//                 <IconButton
//                   icon={<DeleteIcon />}
//                   aria-label="Remove Confirmation Number"
//                   onClick={() => handleRemoveField('confirmationNumbers', index)}
//                   ml={2}
//                 />
//               </Box>
//             ))}
//             <Button onClick={() => handleAddField('confirmationNumbers', { confirmationNumber: '', supplier: '' })} leftIcon={<AddIcon />}>
//               Add Confirmation Number/Supplier
//             </Button>
//           </FormControl>

//           <FormControl>
//             <FormLabel>Names and Date of Births</FormLabel>
//             {formData.namesDateOfBirths.map((entry, index) => (
//               <Box key={index} mb={2}>
//                 <Input
//                   type="text"
//                   placeholder="Name"
//                   value={entry.name}
//                   onChange={(e) => handleArrayChange('namesDateOfBirths', index, e.target.value, 'name')}
//                   mb={1}
//                 />
//                 <Input
//                   type="date"
//                   placeholder="Date of Birth"
//                   value={entry.dateOfBirth}
//                   onChange={(e) => handleArrayChange('namesDateOfBirths', index, e.target.value, 'dateOfBirth')}
//                 />
//                 <IconButton
//                   icon={<DeleteIcon />}
//                   aria-label="Remove Name and Date of Birth"
//                   onClick={() => handleRemoveField('namesDateOfBirths', index)}
//                   ml={2}
//                   mt={1}
//                 />
//               </Box>
//             ))}
//             <Button onClick={() => handleAddField('namesDateOfBirths', { name: '', dateOfBirth: '' })} leftIcon={<AddIcon />}>
//               Add Name and Date of Birth
//             </Button>
//           </FormControl>

//           <FormControl>
//             <FormLabel>Phone Numbers</FormLabel>
//             {formData.phoneNumbers.map((phone, index) => (
//               <Box key={index} mb={2}>
//                 <Input
//                   type="text"
//                   placeholder="Phone Number"
//                   value={phone}
//                   onChange={(e) => handleArrayChange('phoneNumbers', index, e.target.value)}
//                 />
//                 <IconButton
//                   icon={<DeleteIcon />}
//                   aria-label="Remove Phone Number"
//                   onClick={() => handleRemoveField('phoneNumbers', index)}
//                   ml={2}
//                 />
//               </Box>
//             ))}
//             <Button onClick={() => handleAddField('phoneNumbers', '')} leftIcon={<AddIcon />}>
//               Add Phone Number
//             </Button>
//           </FormControl>

//           <FormControl>
//             <FormLabel>Email Addresses</FormLabel>
//             {formData.emailAddresses.map((email, index) => (
//               <Box key={index} mb={2}>
//                 <Input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => handleArrayChange('emailAddresses', index, e.target.value)}
//                 />
//                 <IconButton
//                   icon={<DeleteIcon />}
//                   aria-label="Remove Email Address"
//                   onClick={() => handleRemoveField('emailAddresses', index)}
//                   ml={2}
//                 />
//               </Box>
//             ))}
//             <Button onClick={() => handleAddField('emailAddresses', '')} leftIcon={<AddIcon />}>
//               Add Email Address
//             </Button>
//           </FormControl>

//           <FormControl>
//             <FormLabel>Significant Dates</FormLabel>
//             {formData.significantDates.map((date, index) => (
//               <Box key={index} mb={2}>
//                 <Input
//                   type="date"
//                   placeholder="Significant Date"
//                   value={date}
//                   onChange={(e) => handleArrayChange('significantDates', index, e.target.value)}
//                 />
//                 <IconButton
//                   icon={<DeleteIcon />}
//                   aria-label="Remove Significant Dates"
//                   onClick={() => handleRemoveField('significantDates', index)}
//                   ml={2}
//                 />
//               </Box>
//             ))}
//             <Button onClick={() => handleAddField('significantDates', '')} leftIcon={<AddIcon />}>
//               Add Significant Date
//             </Button>
//           </FormControl>

//           <Button mt={4} colorScheme="teal" onClick={handleAddBooking}>
//             Save Booking
//           </Button>
//         </Box>
//       }
//     />
//   );
// };

// export default BookingForm;
