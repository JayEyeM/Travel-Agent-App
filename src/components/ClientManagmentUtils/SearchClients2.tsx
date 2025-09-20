// File path: TravelAgentApp/src/components/ClientManagmentUtils/SearchClients2.tsx
import React, { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useBrandColors } from "../generalUtils/theme";

import { Client } from "../../api/ClientAPIs";

interface SearchClients2Props {
  clientData: Client[];
  onSearch: (filtered: Client[]) => void;
}

const SearchClients2: React.FC<SearchClients2Props> = ({
  clientData,
  onSearch,
}) => {
  const { primary, secondary, accent } = useBrandColors();
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter clients live as searchTerm changes
  useEffect(() => {
    const filtered = clientData.filter((client) => {
      const term = searchTerm.toLowerCase();
      return (
        client.clientName.toLowerCase().includes(term) ||
        client.clientEmail.toLowerCase().includes(term) ||
        new Date(client.dateCreated * 1000)
          .toLocaleDateString()
          .toLowerCase()
          .includes(term)
      );
    });

    // Sort newest → oldest
    const sorted = filtered.sort((a, b) => b.dateCreated - a.dateCreated);

    onSearch(sorted);
  }, [searchTerm, clientData]);

  const handleViewAll = () => {
    setSearchTerm("");
    const sorted = [...clientData].sort(
      (a, b) => b.dateCreated - a.dateCreated
    );
    onSearch(sorted);
  };

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems={{ base: "left", md: "center" }}
      gap={2}
    >
      <FormControl
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        alignItems={{ base: "left", md: "center" }}
        gap={2}
      >
        <FormLabel htmlFor="searchTerm">Search:</FormLabel>
        <Input
          id="searchTerm"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name, Email, or Creation Date"
          _placeholder={{ color: accent }}
          w={{ base: "100%", md: "300px" }}
        />
      </FormControl>

      <Button
        type="button"
        variant="outline"
        outline="1px solid"
        outlineColor={secondary}
        color={secondary}
        _hover={{ bg: primary, color: secondary }}
        _active={{ bg: secondary }}
        mt={{ base: 2, md: 0 }}
        onClick={handleViewAll}
      >
        View All
      </Button>
    </Box>
  );
};

export default SearchClients2;
