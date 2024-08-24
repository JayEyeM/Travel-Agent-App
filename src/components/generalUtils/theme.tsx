import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}




export const useBrandColors = () => {
  return {
    brand900: useColorModeValue('brand.900.light', 'brand.900.dark'),
    brand800: useColorModeValue('brand.800.light', 'brand.800.dark'),
    brand700: useColorModeValue('brand.700.light', 'brand.700.dark'),
    brand600: useColorModeValue('brand.600.light', 'brand.600.dark'),
  }
}




const theme = extendTheme({
  config,
  colors: {
    brand: {
      900: {
        light: '#F5F5F5',
        dark: '#0F5257',
      },
      800: {
        light: '#0F5257',
        dark: '#F5F5F5',
      },
      700: {
        light: '#FFBD00',
        dark: '#EE7674',
      },
      600: {
        light: '#73A580',
        dark: '#888098',
      },
    },
  },
})

export default theme
