// File: src/components/BookingManagementUtils/SearchBookings2.tsx
import React, { useState, useEffect } from "react";
import { Input, VStack, Box, Text } from "@chakra-ui/react";
import { BookingWithRelations } from "../../api/BookingAPIs";

interface SearchBookingsProps {
  bookings: BookingWithRelations[];
  onFilter: (filtered: BookingWithRelations[]) => void;
}

const SearchBookings2: React.FC<SearchBookingsProps> = ({
  bookings,
  onFilter,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const lowerQuery = query.toLowerCase();

    const filtered = bookings.filter((b) => {
      // Match booking reference
      const refMatch = b.referenceCode.toLowerCase().includes(lowerQuery);

      // Match any traveler name
      const travelerMatch = b.personDetails.some((p) =>
        p.name.toLowerCase().includes(lowerQuery)
      );

      // Match any email address
      const emailMatch = b.emailAddresses.some((e) =>
        e.email.toLowerCase().includes(lowerQuery)
      );

      return refMatch || travelerMatch || emailMatch;
    });

    onFilter(filtered);
  }, [query, bookings, onFilter]);

  return (
    <VStack align="stretch" mb={4}>
      <Box>
        <Text mb={1}>Search Bookings</Text>
        <Input
          placeholder="Type reference, client name, or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>
    </VStack>
  );
};

export default SearchBookings2;
