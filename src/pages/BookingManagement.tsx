//  src/pages/ClientManagment.tsx
import React from "react";
import { Box, Heading, Text, Avatar, List, ListItem } from "@chakra-ui/react";
import ClosableBox from "../components/generalUtils/ClosableBox";
import NewBookingForm from "../components/BookingManagementUtils/NewBookingForm";
import { AddIcon, InfoIcon } from "@chakra-ui/icons";
import ViewBookings from "../components/BookingManagementUtils/ViewBookings";
import BookingList from "../components/BookingManagementUtils/BookingList";

import { useBrandColors } from "../components/generalUtils/theme";

const BookingManagement: React.FC = () => {
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
          Booking Management
        </Heading>
        <Text fontSize="lg">
          Add new bookings and keep track of them below. Click on a booking in
          the Booking List to view more details and add bookings.
        </Text>
      </Box>

      <ClosableBox
        boxShadow={false}
        icon={<InfoIcon h={5} w={5} />}
        title="How Booking Management Works"
        children={
          <List spacing={3} styleType="disc" pl={4} textAlign={"left"}>
            <ListItem>
              Click the "Add New" button and fill out the form to add a new
              booking.
            </ListItem>
            <ListItem>
              Then click the "Booking List" button to view the list of bookings.
              Where you can search through your saved bookings by client name,
              email or client creation date.
            </ListItem>
            <ListItem>
              You can expand each booking card by clicking the button containing
              the client name. You can also view/edit details and delete each
              booking within their booking card by clicking the "View More
              Details" button.
            </ListItem>
            <ListItem>
              Each saved booking will be displayed as a booking card in the
              "View Bookings" section. Within each booking card, there is a
              "View Checklists" button. This allows you to make use of two
              helpful checklists for each booking, to ensure you are on top of
              things.
            </ListItem>
          </List>
        }
        onClose={() => console.log("Close button clicked")}
        onOpen={() => console.log("Open button clicked")}
      />
      <ClosableBox
        boxShadow={false}
        title="New Booking Form"
        buttonText="Add New"
        icon={<AddIcon />}
        children={<NewBookingForm />}
        onOpen={() => {}}
        onClose={() => {}}
      />

      <ClosableBox
        boxShadow={false}
        title="Booking List"
        buttonText="Booking List "
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
        children={<BookingList />}
        onOpen={() => {}}
        onClose={() => {}}
      />
    </Box>
  );
};

export default BookingManagement;
