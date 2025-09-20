//  src/pages/ClientManagment.tsx
import React from "react";
import { Box, Heading, Text, Avatar, List, ListItem } from "@chakra-ui/react";
import ClosableBox from "../components/generalUtils/ClosableBox";
import NewClientForm from "../components/ClientManagmentUtils/NewClientForm";
import { AddIcon, InfoIcon } from "@chakra-ui/icons";
// import ViewClients from "../components/ClientManagmentUtils/ViewClients";

import { useBrandColors } from "../components/generalUtils/theme";
import LoadMockData from "../components/generalUtils/loadMockData";
import ClientList from "../components/ClientManagmentUtils/ClientList";

const ClientManagement: React.FC = () => {
  const { primary, secondary } = useBrandColors();
  return (
    <Box
      textAlign={{ base: "center", md: "left" }}
      py={{ base: 4, md: 6, lg: 8 }}
      px={{ base: 2, md: 6, lg: 12 }}
      minHeight="100vh"
    >
      <Box ml={{ base: 0, md: 4 }} mb={4}>
        <Heading as="h1" size="xl" mb={4}>
          Client Management
        </Heading>
        <Text fontSize="lg">
          Add new clients and keep track of them below. Click on a client in the
          Client List to view client details page -- including their bookings.
        </Text>
      </Box>
      {/* <LoadMockData /> */}
      <ClosableBox
        boxShadow={false}
        icon={<InfoIcon h={5} w={5} />}
        title="How Client Management Works"
        children={
          <List spacing={3} styleType="disc" pl={4} textAlign={"left"}>
            <ListItem>
              Click the "+ Add New Client" button and fill out the form to add a
              new client.
            </ListItem>
            <ListItem>
              Then click the "Client List" button to view the list of clients.
              Where you can search through your saved clients by name, email or
              client creation date.
            </ListItem>
            <ListItem>
              You can click the "View Client" button for any of the clients to
              go to their "client page", view more details, edit their details
              or delete the client.
            </ListItem>
            <ListItem>
              Each clients' "client page" will display their specific saved
              bookings as a booking card below the client's details. Within each
              booking card, there is a "View Checklists" button. This allows you
              to make use of two helpful checklists for each booking, to ensure
              you are on top of things.
            </ListItem>
            <ListItem>
              To add bookings to a client, go to the "Bookings Management" page.
            </ListItem>
          </List>
        }
        onClose={() => console.log("Close button clicked")}
        onOpen={() => console.log("Open button clicked")}
      />
      {/* <ClosableBox
        boxShadow={false}
        title="New Client Form"
        buttonText="Add New"
        icon={<AddIcon />}
        children={<NewClientForm />}
        onOpen={() => {}}
        onClose={() => {}}
      />
      <ClientList /> */}

      <ClosableBox
        boxShadow={false}
        title="Client List"
        buttonText="Client List "
        icon={
          <Avatar
            bg={primary}
            color={secondary}
            variant={"roundedSquare"}
            outline={"1px solid"}
            outlineColor={secondary}
            size="xs"
          />
        }
        children={<ClientList />}
        onOpen={() => {}}
        onClose={() => {}}
      />
    </Box>
  );
};

export default ClientManagement;
