import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
  useToast,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, DownloadIcon } from '@chakra-ui/icons';
import { useBrandColors } from '../generalUtils/theme';

interface LocalStorageData {
  [key: string]: any;
}

const LocalStorageDisplay: React.FC = () => {
  const [data, setData] = useState<LocalStorageData>({});
  const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { background, primary, text, secondary, accent } = useBrandColors();

  // Keys to display
  const keysToDisplay = ['ClientList', 'CommissionFormData', 'NotesList'];

  useEffect(() => {
    const storedData: LocalStorageData = {};
    const initialVisibility: { [key: string]: boolean } = {};

    for (const key of keysToDisplay) {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          storedData[key] = JSON.parse(item);
        } catch (error) {
          storedData[key] = item; // Fallback for non-JSON strings
        }
        initialVisibility[key] = false;
      }
    }

    // Extract bookings from ClientList
    const clientList = storedData['ClientList'] || [];
    const allBookings: any[] = [];

    clientList.forEach((client: any) => {
      const { clientName, bookings } = client;
      if (bookings && bookings.length > 0) {
        bookings.forEach((booking: any) => {
          allBookings.push({
            ...booking,
            clientName, // Include client name for display
          });
        });
      }
    });

    storedData['Bookings'] = allBookings; // Store the extracted bookings
    console.log('Stored Data:', storedData); // Log to see what is being stored
    setData(storedData);
    setVisibility(initialVisibility);
  }, []);

  const toggleCategory = (category: string): void => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [category]: !prevVisibility[category],
    }));
  };

  const handleExport = (title: string, exportType: 'json' | 'csv') => {
    const dataToExport = data[title];
    if (dataToExport && dataToExport.length > 0) {
      const jsonData = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonData], { type: exportType === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}_data.${exportType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast({
        title: `${title} data exported as ${exportType.toUpperCase()} successfully!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `No data available for ${title}`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderTable = (title: string, data: any) => (
    <Box my={4} w={{ base: '100%', md: '80%' }} ml={'auto'} mr={'auto'} p={4} borderWidth={2} borderRadius="lg" borderColor={primary} boxShadow="0px 0px 5px 1px gray">
      <Heading size="md" mb={2} color={accent}>
        View Your {title}
      </Heading>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          color={secondary}
          bg={background}
          title="View/Hide"
          aria-label="View/Hide"
          onClick={() => toggleCategory(title)}
        >
          {visibility[title] ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {visibility[title] ? 'Hide' : 'Show'}
        </Button>
        <Box>
          <Button
            color={secondary}
            bg={background}
            title="Export JSON"
            aria-label="Export JSON"
            leftIcon={<DownloadIcon />}
            ml={2}
            onClick={() => handleExport(title, 'json')}
          >
            Export JSON
          </Button>
          <Button
            color={secondary}
            bg={background}
            title="Export CSV"
            aria-label="Export CSV"
            leftIcon={<DownloadIcon />}
            ml={2}
            onClick={() => handleExport(title, 'csv')}
          >
            Export CSV
          </Button>
        </Box>
      </Box>
      <Box my={4} p={4} borderWidth={1} overflowX="scroll" borderRadius="lg" display={visibility[title] ? 'block' : 'none'}>
        {data.length === 0 ? (
          <Text>No data available</Text>
        ) : (
          <Table variant="striped" mt={4} color={text} bg={background}>
            <Thead>
              <Tr>
                {Object.keys(data[0] || {}).map((key) => (
                  <Th key={key}>{key}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody fontSize={{ base: 'xs', md: 'sm' }}>
              {data.map((item: any, rowIndex: number) => (
                <Tr key={rowIndex}>
                  {Object.values(item).map((value, cellIndex) => (
                    <Td key={cellIndex}>{typeof value === 'string' ? value : JSON.stringify(value)}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );

  return (
    <Box p={5} w={{ base: '100%', md: '80%' }} ml={'auto'} mr={'auto'} bg={background} boxShadow="0px 0px 5px 1px gray" borderRadius="lg" mt={10}>
      <Heading size="lg" mb={6} color={accent}>
        View/Export Data Tables
      </Heading>
      <Text fontSize="lg" color={text} mb={4}>
        Export data in JSON or CSV format for external use, or for printing from the data management tool of your choice,
        like Google Sheets or Microsoft Excel.
      </Text>
      {Object.keys(data).map((key) => (
        <Box key={key}>
          {renderTable(key, data[key])}
        </Box>
      ))}
    </Box>
  );
};

export default LocalStorageDisplay;
