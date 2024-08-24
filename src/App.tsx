import { Box } from '@chakra-ui/react'
import CommisionCalculator from './components/calculatorUtils/commissionCalculator'
import { useBrandColors } from './components/generalUtils/theme'
import NavBar from './components/generalUtils/navBar'

function App() {
  
  
  const { brand700, brand900, brand800, brand600 } = useBrandColors()

  return (
    <Box bg={brand900} h="auto" w={'100vw'} p={{ base: 4, md: 8, lg: 12 }}>
      <NavBar />

      <CommisionCalculator />
    </Box>
  )
}

export default App
