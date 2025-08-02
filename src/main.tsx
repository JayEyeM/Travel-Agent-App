//main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './components/generalUtils/theme.tsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ChakraProvider theme={theme}>
      <App />
      </ChakraProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
