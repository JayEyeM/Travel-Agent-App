//  src/pages/ClientManagment.tsx
import React from 'react';
import { Box, Heading, Text, Avatar, List, ListItem } from '@chakra-ui/react';
import ClosableBox from '../components/generalUtils/ClosableBox';
import NewClientForm from '../components/ClientManagmentUtils/NewClientForm';
import { AddIcon, CloseIcon, ViewIcon, ViewOffIcon, InfoIcon } from '@chakra-ui/icons';
import ViewClients from '../components/ClientManagmentUtils/ViewClients';
import useClientData from '../components/ClientManagmentUtils/UseClientDataHook';
import { useBrandColors } from '../components/generalUtils/theme';

const ClientManagement: React.FC = () => {
  const { primary, background, secondary, accent, text } = useBrandColors();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
       Client Management
      </Heading>
      <Text fontSize="lg">
        Add new clients and keep track of them below. Click on a client in the Client List to view more 
        details and use handy tools, such as the Trip Planner and Commission Calculator.
      </Text>
      <ClosableBox
      boxShadow= {false}
      icon={<InfoIcon h={5} w={5} />}
      title='How Client Management Works'
      children={
        <List spacing={3} styleType="disc" pl={4} textAlign={'left'}>
                <ListItem>
                    Click the "Add New" button and fill out the form to add a new client.
                </ListItem>
                <ListItem>
                    Then click the "Client List" button to view the list of clients. Where you can search through your saved clients by name, email or client creation date.
                </ListItem>
                <ListItem>
                    You can expand each client card by clicking the button containing the client name. In each card you will see that you can add and view bookings
                    in a similar manner as to how you can add and view clients. You can also view/edit details and delete each client within their client card by 
                    clicking the "View More Details" button.
                </ListItem>
                <ListItem>
                    Each saved booking will be displayed as a booking card in the "View Bookings" section. Within each booking card, there is a "View Checklists" button. This allows you to make use
                    of two helpful checklists for each booking, to ensure you are on top of things.
                </ListItem>
            </List>
      }
      onClose={() => console.log('Close button clicked')}
      onOpen={() => console.log('Open button clicked')}
      />
      <ClosableBox boxShadow={false} title="New Client Form" buttonText="Add New" icon={<AddIcon />} children={<NewClientForm />} onOpen={() => {}} onClose={() => {}} />

      <ClosableBox boxShadow={false} title="Client List" buttonText="Client List " icon={<Avatar bg={primary} color={secondary} variant={'roundedSquare'} outline={"1px solid"} outlineColor={secondary} size="xs" />} children={<ViewClients />} onOpen={() => {}} onClose={() => {}} />
    </Box>
  );
};

export default ClientManagement;
