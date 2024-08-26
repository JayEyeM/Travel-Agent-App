// src/pages/projectMangement.tsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const ProjectManagement: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to the Project Management page
      </Heading>
      <Text fontSize="lg">
        This is the Project Management of your application.
      </Text>
    </Box>
  );
};

export default ProjectManagement;
