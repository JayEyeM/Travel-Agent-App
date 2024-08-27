import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}




export const useBrandColors = () => {
  return {
    primary: useColorModeValue('brand.Primary.light', 'brand.Primary.dark'),
    secondary: useColorModeValue('brand.Secondary.light', 'brand.Secondary.dark'),
    accent: useColorModeValue('brand.Accent.light', 'brand.Accent.dark'),
    background: useColorModeValue('brand.Background.light', 'brand.Background.dark'),
    text: useColorModeValue('brand.Text.light', 'brand.Text.dark'),
  }
}




const theme = extendTheme({
  config,
  colors: {
    brand: {
      Primary: {
        light: '#6588A6',
        dark: '#3A506B ',
      },
      Secondary: {
        light: '#F3A712',
        dark: '#FFB84D',
      },
      Accent: {
        light: '#468685',
        dark: '#7EB1B4',
      },
      Background: {
        light: '#F4F6F8',
        dark: '#1A1C1E',
      },
      Text: {
        light: '#2C3E50',
        dark: '#E0E3E6',
      },
    },
  },
})

export default theme
