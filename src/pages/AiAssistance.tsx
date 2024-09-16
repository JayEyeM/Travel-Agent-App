// src/pages/projectMangement.tsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import ChatGPT from '../components/aiAssistanceUtils/ChatGPT';
import { useBrandColors } from '../components/generalUtils/theme';

const AiAssistance: React.FC = () => {
  const { background, primary, text, secondary, accent } = useBrandColors();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Use AI Assistant to help visualize your data.
      </Heading>
      <Text color={secondary} fontSize="lg">
        AI Assistant is a powerful tool that uses Open AI's GPT-3 to help you visualize your data.
        However, it is not perfect and may not be fully accurate in some cases.
      </Text>
      <Text mt={4} fontSize="lg">
        Click one of the prompts below to get started.
      </Text>
      <ChatGPT />
    </Box>
  );
};

export default AiAssistance;
