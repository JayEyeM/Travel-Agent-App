import { Box, Button, Text, SimpleGrid, useToast, Card, CardHeader, CardBody, CardFooter, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, FormControl, FormLabel, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import useCommissionsData from './useCommissionsDataHook';
import { useBrandColors } from '../generalUtils/theme';
import ClosableBox from '../generalUtils/ClosableBox';

interface EditedData {
    rate: number;
    commission: number;
    commissionRateAmount: number;
  }

const DisplayCommissions = () => {
  const { commissions, deleteCommission, updateCommission } = useCommissionsData();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any | null>(null);
  const toast = useToast();

  const { primary, background, accent, secondary, text } = useBrandColors();

  // Function to calculate commission rate amount
  const calculateCommissionRateAmount = (rate: number, commission: number) => {
    // Example calculation; adjust as needed
    return (commission * (rate / 100));
  };

  // Handle delete
  const handleDelete = (commissionId: number) => {
    deleteCommission(commissionId);
    toast({
      title: 'Commission deleted.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle edit - opens the edit modal and sets the current commission
  const handleEdit = (commission: any) => {
    setEditedData({
      ...commission,
      commissionRateAmount: calculateCommissionRateAmount(commission.rate, commission.commission)
    });
    setIsEditing(true);
  };

  // Handle form input changes for editing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target;
    
    setEditedData((prev: EditedData | null) => {
        if (prev) {
          const newValue = type === 'checkbox' ? checked : parseFloat(value) || '';
          const updatedData = {
            ...prev,
            [id]: newValue
          };
          // Recalculate commissionRateAmount if rate or commission changes
          if (id === 'rate' || id === 'commission') {
            updatedData.commissionRateAmount = calculateCommissionRateAmount(
              updatedData.rate || prev.rate,
              updatedData.commission || prev.commission
            );
          }
          return updatedData;
        }
        return null;
      });
  };

  // Submit the edit form
  const handleSubmitEdit = () => {
    if (editedData && editedData.commissionId) {
      // Ensure commissionRateAmount is recalculated before updating
      const updatedData = {
        ...editedData,
        commissionRateAmount: calculateCommissionRateAmount(
          editedData.rate,
          editedData.commission
        )
      };
      updateCommission(editedData.commissionId, updatedData);
      setIsEditing(false);
      toast({
        title: 'Commission updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={5}>
        {commissions.length > 0 ? (
          commissions.map((commission) => (
            <Card key={commission.commissionId} boxShadow="0px 0px 5px 1px"
            outline={'1px solid'} outlineColor={accent}
            >
              <CardHeader bg={background}>
                <Text color={accent} fontSize="xl" fontWeight="bold">
                  {commission.clientName}
                </Text>
                <Text color="gray.500">Commission ID: {commission.commissionId}</Text>
              </CardHeader>
              <CardBody bg={background}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              >
                <ClosableBox children={
                  <Box textAlign={"left"}>
                <Text color={accent}>Supplier: <Text as="span" color={text}>{commission.supplier}</Text></Text>
                <Text color={accent}>Booking Travel Date: <Text as="span" color={text}>{commission.bookingTravelDate}</Text></Text>
                <Text color={accent}>Confirmation Number: <Text as="span" color={text}>{commission.confirmationNumber}</Text></Text>
                <Text color={accent}>Rate: <Text as="span" color={text}>{commission.rate}%</Text></Text>
                <Text color={accent}>Commission Amount: <Text as="span" color={text}>${commission.commission}</Text></Text>
                <Text color={accent}>Commission Rate Amount: <Text as="b" fontSize={"xl"} color={secondary}>${commission.commissionRateAmount.toFixed(2)}</Text></Text>
                <Text color={accent}>Invoiced: <Text as="span" color={text}>{commission.invoiced ? 'Yes' : 'No'}</Text></Text>
                <Text color={accent}>Paid: <Text as="span" color={text}>{commission.paid ? 'Yes' : 'No'}</Text></Text>
                <Text color={accent}>Payment Date: <Text as="span" color={text}>{commission.paymentDate}</Text></Text>
                </Box>
                } 
                title={"Commission Details"}
                buttonText='Commission Details'
                onOpen={() => console.log('open')}
                onClose={() => console.log('close')} 
                />
                </CardBody>
              <CardFooter bg={background} 
              display={"flex"}
              justifyContent={"space-between"}
              >
                <Button bg={primary} color={secondary} onClick={() => handleEdit(commission)} mr={2}>
                  Edit
                </Button>
                <Button variant="outline" colorScheme="red" onClick={() => handleDelete(commission.commissionId)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Text>No commissions available.</Text>
        )}
      </SimpleGrid>

      {/* Edit Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Commission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor='rate'>Commission Rate (%)</FormLabel>
              <Input id='rate' type='number' value={editedData?.rate || ''} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='commission'>Commission Amount ($00.00)</FormLabel>
              <Input id='commission' type='number' value={editedData?.commission || ''} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='invoiced'>Invoiced</FormLabel>
              <Checkbox id='invoiced' isChecked={editedData?.invoiced || false} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='paid'>Paid</FormLabel>
              <Checkbox id='paid' isChecked={editedData?.paid || false} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='paymentDate'>Payment Date</FormLabel>
              <Input id='paymentDate' type='date' value={editedData?.paymentDate || ''} onChange={handleChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button bg={accent} color={primary} onClick={handleSubmitEdit} mr={3}>
              Save
            </Button>
            <Button variant='outline' colorScheme='red' onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DisplayCommissions;
