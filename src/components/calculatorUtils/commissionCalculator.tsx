import { Box, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import CommisionForm from './commissionForm'
import { useBrandColors } from '../generalUtils/theme'

const CommisionCalculator = () => {
    const { primary, background, accent, secondary, text } = useBrandColors()

  return (
    <Box p={0} ml={'auto'} mr={'auto'} w={'90%'} borderRadius="lg" bg={background}>
      <Box
        p={4}
        mt={0}
        outline="2px solid"
        outlineColor="white"
        borderRadius="lg"
        bg={background}
      >
        <Heading>Commision Calculator</Heading>
        <Text fontSize="lg" color={text}>
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
        bg={background}
      >
        <Text fontSize="lg" color={accent}>
          Commission ( __ % ):
        </Text>
        <Text fontSize="lg" color={accent}>
          $0.00
        </Text>
      </Box>
    </Box>
  )
}

export default CommisionCalculator
