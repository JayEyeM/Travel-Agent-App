import { Box, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import CommisionForm from './commissionForm'
import { useBrandColors } from '../generalUtils/theme'

const CommisionCalculator = () => {
    const { brand700, brand900, brand800, brand600 } = useBrandColors()

  return (
    <Box p={4} m={2} borderRadius="lg" bg={brand600}>
      <Box
        p={4}
        mt={0}
        outline="2px solid"
        outlineColor="white"
        borderRadius="lg"
        bg={brand900}
      >
        <Heading>Commision Calculator</Heading>
        <Text fontSize="lg" color={brand800}>
          Fill in the form to calculate your commission
        </Text>
      </Box>
      <CommisionForm />
      <Box
        p={4}
        mt={4}
        outline="2px solid"
        outlineColor="white"
        borderRadius="lg"
        bg={brand700}
      >
        <Text fontSize="lg" color={brand800}>
          Commission ( __ % ):
        </Text>
        <Text fontSize="lg" color={brand800}>
          $0.00
        </Text>
      </Box>
    </Box>
  )
}

export default CommisionCalculator
