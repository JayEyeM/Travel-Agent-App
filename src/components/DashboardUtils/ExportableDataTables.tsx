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
import { ChevronUpIcon, ChevronDownIcon, DownloadIcon, AddIcon} from '@chakra-ui/icons';
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
  const keysToDisplay = ['ClientList', 'CommissionFormData', 'Notes'];

  // Initializing the data and visibility state
  useEffect(() => {
    const storedData: LocalStorageData = {};
    const initialVisibility: { [key: string]: boolean } = {};
    for (const key of keysToDisplay) {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          storedData[key] = JSON.parse(item);
        } catch (error) {
          // if the stored data is not valid JSON, treat it as a string
          storedData[key] = item;
        }
        // make the visibility state false by default
        initialVisibility[key] = false;
      }
    }
    setData(storedData);
    setVisibility(initialVisibility);
  }, []);

  const toggleCategory = async (category: string): Promise<void> => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [category]: !prevVisibility[category],
    }));
  };

  const handleExport = (title: string, exportType: 'json' | 'csv') => {
    const dataToExport = data[title];
    if (dataToExport && dataToExport.length > 0) {
      if (exportType === 'json') {
        // Export as JSON
        const jsonData = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}_data.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: `${title} data exported as JSON successfully!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else if (exportType === 'csv') {
        // Export as CSV
        const csvContent = dataToExport.reduce((acc: string, row: any) => {
          const values = Object.values(row).map((value) => `"${value}"`).join(',');
          return `${acc}${values}\n`;
        }, Object.keys(dataToExport[0]).map((key) => `"${key}"`).join(',') + '\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}_data.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: `${title} data exported as CSV successfully!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: `No data available for ${title}`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

//   const handlePrint = async (title: string) => {
//     // Ensure the table is visible before printing
//     await toggleCategory(title);
  
//     // Create a new window for printing
//     const printWindow = window.open('', '', 'height=600,width=800');
//     if (printWindow) {
//       // Write the HTML content for printing
//       printWindow.document.open();
//       printWindow.document.write(`
//         <html>
//         <head>
//           <title>${title} Print</title>
//           <style>
//             body { font-family: Arial, sans-serif; }
//             table { width: 100%; border-collapse: collapse; page-break-inside: auto; }
//             th, td { border: 1px solid #ddd; padding: 8px; }
//             th { background-color: #f4f4f4; }
//             /* Ensure table fits the page width */
//             @media print {
//               body {
//                 margin: 0;
//                 padding: 0;
//                 overflow: hidden;
//               }
//               table {
//                 width: 100%;
//                 page-break: auto;
//                 white-space: nowrap;
//               }
//               thead {
//                 display: table-header-group;
//               }
//               tbody {
//                 display: table-row-group;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           <h1>${title}</h1>
//           <div style="overflow-x: auto;">
//             <table>
//               <thead>
//                 <tr>
//                   ${Object.keys(data[title][0] || {}).map(key => `<th>${key}</th>`).join('')}
//                 </tr>
//               </thead>
//               <tbody>
//                 ${data[title].map((item: any) => `
//                   <tr>
//                     ${Object.values(item).map(value => `<td>${typeof value === 'string' ? value : JSON.stringify(value)}</td>`).join('')}
//                   </tr>
//                 `).join('')}
//               </tbody>
//             </table>
            
//           </div>
//           <h2>Scroll to the right as needed and Press Ctrl+P (Cmd+P on Mac) to print more of the table.</h2>
//         </body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.focus();
  
//       // Trigger the print dialog
//       printWindow.print();
//     }
//   };
  
  

  const renderTable = (title: string, data: any) => (
    <Box my={4} p={4} borderWidth={2} borderRadius="lg" borderColor={primary} boxShadow={"0px 0px 5px 1px gray"}>
      <Heading size="md" mb={2} color={accent}>
        View Your {title}
      </Heading>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          color={secondary}
          bg={background}
          title='View/Hide'
          aria-label='View/Hide'
          onClick={() => toggleCategory(title)}
        >
          
          {visibility[title] ? < ChevronUpIcon /> : <ChevronDownIcon />}
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
          {/* <Button
            variant='solidBlue'
            title="Print"
            aria-label="Print"
            leftIcon={<AddIcon />}
            ml={2}
            onClick={() => handlePrint(title)}
            colorScheme={colorMode === 'dark' ? 'gray' : 'teal'}
          >
            Print
          </Button> */}
        </Box>
      </Box>
      <Box my={4} p={4} borderWidth={1} borderRadius="lg" display={visibility[title] ? 'block' : 'none'}
      w={'100%'} overflowX={'scroll'}
      >
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
      </Box>
    </Box>
  );

  return (
    <Box p={5} bg={background} boxShadow={"0px 0px 5px 1px gray"} borderRadius={'lg'} mt={10}>
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