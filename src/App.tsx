import { Box } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/homepage';
import CommisionCalculator from './components/calculatorUtils/commissionCalculator';
import { useBrandColors } from './components/generalUtils/theme';
import NavBar from './components/generalUtils/navBar';
import Dashboard from './pages/dashboard';
import About from './pages/about';
import PagesMenu from './components/generalUtils/PagesMenu';
import ProjectManagement from './pages/projectManagement';

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
      case '/projectManagement':
        return 'projectManagement';
      case '/about':
        return 'about';
      default:
        return '';
    }
  };

  return (
    <Box bg={brand900} h="auto" w="100vw" p={{ base: 4, md: 8, lg: 12 }}>

      <NavBar />
      <Box h="auto" w="100%" p={{ base: 4, md: 8, lg: 12 }} 
      outline={'2px solid red'}
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      >
        <PagesMenu currentPage={getCurrentPage()} />
          <Box h="auto" w="100%" p={{ base: 4, md: 8, lg: 12 }}
          outline={'2px solid blue'}
          >
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/calculator" element={<CommisionCalculator />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projectManagement" element={<ProjectManagement />} />

              <Route path="/about" element={<About />} />
            </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
