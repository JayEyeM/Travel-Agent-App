//  src/pages/ClientManagment.tsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import ClosableBox from '../components/generalUtils/ClosableBox';
import NewClientForm from '../components/ClientManagmentUtils/NewClientForm';
import { AddIcon, CloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const ClientManagement: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to the Client Management page
      </Heading>
      <Text fontSize="lg">
        This is the Client Management of your application.
      </Text>
      <ClosableBox title="New Client Form" buttonText="Add New" icon={<AddIcon />}  children={NewClientForm()} onOpen={() => {}} onClose={() => {}} />
      <ClosableBox title="View Clients" buttonText="View Clients"  children={<div>View Clients</div>} onOpen={() => {}} onClose={() => {}} />
    </Box>
  );
};

export default ClientManagement;
