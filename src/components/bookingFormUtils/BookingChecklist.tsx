import React, { useState, useEffect } from 'react';
import { Flex, Box, Heading, Checkbox, VStack, Text } from '@chakra-ui/react';
import { filesChecklistData, marketingChecklistData } from './checklistsUtils/checklistsData';
import { bookingFormData } from '../generalUtils/interfaces';
import { useBrandColors } from '../generalUtils/theme';
import ClosableBox from '../generalUtils/ClosableBox';

interface ChecklistItem {
  id: number;
  title: string;
  isChecked: boolean;
}

interface BookingChecklistProps {
  clientId: number;
  bookingId: string;
}

const BookingChecklist: React.FC<BookingChecklistProps> = ({ clientId, bookingId }) => {
  const [filesChecklist, setFilesChecklist] = useState<ChecklistItem[]>([]);
  const [marketingChecklist, setMarketingChecklist] = useState<ChecklistItem[]>([]);

  const { accent, secondary } = useBrandColors();

  // Load checklist data from local storage when the component mounts
  useEffect(() => {
    const loadChecklistData = () => {
      const clients = JSON.parse(localStorage.getItem('ClientList') || '[]');
      const client = clients.find((c: any) => c.id === clientId);
      if (client) {
        const currentBooking = client.bookings.find(
          (booking: bookingFormData) => booking.bookingId === bookingId
        );
        if (currentBooking) {
          // If checklist exists in storage, load it, else use default checklists
          setFilesChecklist(currentBooking.filesChecklist || filesChecklistData);
          setMarketingChecklist(currentBooking.marketingChecklist || marketingChecklistData);
        } else {
          // If booking does not exist, use defaults
          setFilesChecklist(filesChecklistData);
          setMarketingChecklist(marketingChecklistData);
        }
      }
    };

    loadChecklistData(); // Load checklist when the component mounts
  }, [clientId, bookingId]);

  // Save checklist state to local storage whenever checklists change
  useEffect(() => {
    const saveChecklistData = () => {
      const clients = JSON.parse(localStorage.getItem('ClientList') || '[]');
      const clientIndex = clients.findIndex((c: any) => c.id === clientId);

      if (clientIndex !== -1) {
        const updatedBookings = clients[clientIndex].bookings.map(
          (booking: bookingFormData) =>
            booking.bookingId === bookingId
              ? { ...booking, filesChecklist, marketingChecklist }
              : booking
        );
        clients[clientIndex].bookings = updatedBookings;
        localStorage.setItem('ClientList', JSON.stringify(clients)); // Save updated clients to local storage
      }
    };

    if (filesChecklist.length > 0 && marketingChecklist.length > 0) {
      saveChecklistData(); // Save checklists only if data is loaded
    }
  }, [filesChecklist, marketingChecklist, clientId, bookingId]);

  // Toggle checklist item
  const toggleItem = (list: 'files' | 'marketing', id: number) => {
    const updateList = (prevState: ChecklistItem[]) =>
      prevState.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      );

    if (list === 'files') {
      setFilesChecklist(updateList);
    } else if (list === 'marketing') {
      setMarketingChecklist(updateList);
    }
  };

  return (
    <ClosableBox title="Checklists" buttonText="View Checklists" onOpen={() => {}} onClose={() => {}}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Heading color={accent} as="h2" size="md" mb={4}>
          Files Checklist
        </Heading>
        <VStack spacing={3} align="stretch" width="100%">
          {filesChecklist.map(item => (
            <Flex key={item.id} justify="space-between" align="center"
            outline={"1px solid "} 
            outlineColor={secondary}
            p={2}
            borderRadius={"lg"}
            bg={item.isChecked ? accent : "none" }
            >
              <Text textAlign={"left"} >{item.id}. {item.title}</Text>
              <Checkbox
                isChecked={item.isChecked}
                onChange={() => toggleItem('files', item.id)}
                size="lg"
              />
            </Flex>
          ))}
        </VStack>

        <Heading color={accent} as="h2" size="md" mt={8} mb={4}>
          Marketing Checklist
        </Heading>
        <VStack spacing={3} align="stretch" width="100%">
          {marketingChecklist.map(item => (
            <Flex key={item.id} justify="space-between" align="center" 
            outline={"1px solid "} 
            outlineColor={secondary}
            p={2}
            borderRadius={"lg"}
            bg={item.isChecked ? accent : "none" }
            >
              <Text textAlign={"left"} >{item.id}. {item.title}</Text>
              <Checkbox
                isChecked={item.isChecked}
                onChange={() => toggleItem('marketing', item.id)}
                size="lg"
              />
            </Flex>
          ))}
        </VStack>
      </Box>
    </ClosableBox>
  );
};

export default BookingChecklist;
