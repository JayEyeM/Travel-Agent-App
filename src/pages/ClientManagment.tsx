//  src/pages/ClientManagment.tsx
import React from 'react';
import { Box, Heading, Text, Avatar } from '@chakra-ui/react';
import ClosableBox from '../components/generalUtils/ClosableBox';
import NewClientForm from '../components/ClientManagmentUtils/NewClientForm';
import { AddIcon, CloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import ViewClients from '../components/ClientManagmentUtils/ViewClients';
import useClientData from '../components/ClientManagmentUtils/UseClientDataHook';
import { useBrandColors } from '../components/generalUtils/theme';

const ClientManagement: React.FC = () => {
  const { primary, background, secondary, accent, text } = useBrandColors();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to the Client Management page
      </Heading>
      <Text fontSize="lg">
        This is the Client Management of your application.
      </Text>
      <ClosableBox title="New Client Form" buttonText="Add New" icon={<AddIcon />} children={<NewClientForm />} onOpen={() => {}} onClose={() => {}} />

      <ClosableBox title="View Clients" buttonText="View Clients " icon={<Avatar bg={primary} color={secondary} variant={'roundedSquare'} outline={"1px solid"} outlineColor={secondary} size="xs" />} children={<ViewClients />} onOpen={() => {}} onClose={() => {}} />
    </Box>
  );
};

export default ClientManagement;
