import { Box } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/homepage';
import CommisionCalculator from './components/calculatorUtils/commissionCalculator';
import { useBrandColors } from './components/generalUtils/theme';
import NavBar from './components/generalUtils/navBar';
import Dashboard from './pages/dashboard';
import About from './pages/about';
import PagesMenu from './components/generalUtils/PagesMenu';

function App() {
  const { brand900 } = useBrandColors();
  const location = useLocation();

  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/':
        return 'home';
      case '/calculator':
        return 'calculator';
      case '/dashboard':
        return 'dashboard';
      case '/about':
        return 'about';
      default:
        return '';
    }
  };

  return (
    <Box bg={brand900} h="auto" w="100vw" p={{ base: 4, md: 8, lg: 12 }}>
      <NavBar />
      <PagesMenu currentPage={getCurrentPage()} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/calculator" element={<CommisionCalculator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Box>
  );
}

export default App;
