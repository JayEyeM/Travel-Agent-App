// src/components/ChatGPT.tsx
import React, { useState } from 'react';
import { Box, Button, Select, VStack } from '@chakra-ui/react';
import { getGptResponse } from './openaiService';
import ReactMarkdown from 'react-markdown';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useBrandColors } from '../generalUtils/theme';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChatGPT: React.FC = () => {
  const [chatLog, setChatLog] = useState<{ user: string; bot: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');

  const { background, primary, text, secondary, accent } = useBrandColors();

  const clients = ['Client A', 'Client B', 'Client C']; // Example list of clients

  const handleButtonClick = async (prompt: string) => {
    setLoading(true);
    try {
      const botResponse = await getGptResponse(prompt);
      setChatLog((prevChatLog) => [...prevChatLog, { user: prompt, bot: botResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setChatLog((prevChatLog) => [...prevChatLog, { user: prompt, bot: 'Error fetching response' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClient(e.target.value);
  };

  const parseTable = (response: string) => {
    const rows = response.split('\n').slice(1);
    return (
      <Box as="table" border="1px solid black" width="100%" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {response.split('\n')[0].split('|').map((header, index) => (
              <Box as="th" key={index} border="1px solid black" padding="8px" textAlign="left">
                {header.trim()}
              </Box>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.split('|').map((cell, cellIndex) => (
                <Box as="td" key={cellIndex} border="1px solid black" padding="8px">
                  {cell.trim()}
                </Box>
              ))}
            </tr>
          ))}
        </tbody>
      </Box>
    );
  };

  const renderChart = (data: any) => {
    const chartData = {
      labels: data.labels,
      datasets: [
        {
          label: 'My Data',
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    return <Bar data={chartData} />;
  };

  const renderBotResponse = (response: string) => {
    if (response.startsWith('|')) {
      return parseTable(response);
    } else if (response.includes('chart')) {
      try {
        const chartData = JSON.parse(response);
        return renderChart(chartData);
      } catch (error) {
        console.error('Error parsing chart data:', error);
        return <p>Error rendering chart.</p>;
      }
    } else {
      return <ReactMarkdown>{response}</ReactMarkdown>;
    }
  };

  return (
    <VStack spacing={4} width="100%">
      <Box boxShadow={"0px 0px 5px 1px gray"} mt={4} width="100%" p={4} borderWidth="1px" borderRadius="lg" height="400px" overflowY="auto">
        {chatLog.map((entry, index) => (
          <Box key={index} mb={4} >
            <Box w={"60%"} marginLeft={"auto"} mb={2} border="1px solid" borderColor={accent} p={4} borderRadius="lg">
                <strong>User:</strong> {entry.user}
            </Box>
            
            <Box w={"90%"} border="1px solid" borderColor={secondary} p={4} borderRadius="lg">
                <strong>Bot:</strong> {renderBotResponse(entry.bot)}
            </Box>
          </Box>
        ))}
      </Box>
    <Box 
      width="100%"
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={{ base: "center", md: "space-between" }}
      alignItems="center"
      gap={4}
    >
      <Button
        onClick={() => handleButtonClick('Provide a table of all clients and their data')}
        bg={background}
        color={secondary}
        outlineColor={secondary}
        isLoading={loading}
      >
        Show Clients Table
      </Button>

      <Button
        onClick={() => handleButtonClick('Provide a graph/chart that shows my commissions for the current month')}
        bg={background}
        color={secondary}
        outlineColor={secondary}
        isLoading={loading}
      >
        Show Commissions Chart
      </Button>

      <Box outline={"1px solid"} outlineColor={secondary} borderRadius="lg" p={4}>
        
        <Select 
        bg={background}
        color={text}
        outlineColor={secondary}
          id="client-select"
          aria-labelledby="client-select-label"
          onChange={handleClientChange} 
          value={selectedClient}
          placeholder="Select Client"
          mb={2}
        >
          {clients.map((client) => (
            <option key={client} value={client}>
              {client}
            </option>
          ))}
        </Select>
      

      <Button
        onClick={() => handleButtonClick(`Show me the client ${selectedClient} and all their related data in a table`)}
        bg={background}
        color={secondary}
        outlineColor={secondary}
        isLoading={loading}
        disabled={!selectedClient}
        mt={2}
      >
        Show Selected Client's Data
      </Button>
      </Box>
      </Box>
    </VStack>
  );
};

export default ChatGPT;
