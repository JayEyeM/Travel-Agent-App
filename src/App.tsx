import { Box } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/homepage';
import CommisionCalculator from './components/calculatorUtils/commissionCalculator';
import { useBrandColors } from './components/generalUtils/theme';
import NavBar from './components/generalUtils/navBar';
import Dashboard from './pages/dashboard';
import About from './pages/about';
import PagesMenu from './components/generalUtils/PagesMenu';
import AiAssistance from './pages/AiAssistance';
import Footer from './components/generalUtils/footer';
import ClientManagement from './pages/ClientManagment';
import Signin from './pages/signin';
import Signout from './pages/signout';
import Signup from './pages/signup';
import LearnMore from './pages/learnMore';
import Resources from './pages/Resources';
import ToDoNotes from './components/generalUtils/ToDoNotes';
import Policies from './pages/Policies';

function App() {
  const { primary, background } = useBrandColors();
  const location = useLocation();

  const getCurrentPage = () => {
    switch (location.pathname) {
      
      case '/calculator':
        return 'calculator';
      case '/todoNotes':
        return 'todoNotes';
      case '/dashboard':
        return 'dashboard';
      case '/clientManagement':
        return 'clientManagement';
        case '/resources':
        return 'resources';
      case '/aiAssistance':
        return 'aiAssistance';
      
      default:
        return '';
    }
  };

  return (
    <Box bg={background} h="auto" w="100vw" p={{ base: 4, md: 8, lg: 12 }}>

      <NavBar />
      <Box h="auto" minH={'90vh'} w="100%" p={{ base: 4, md: 8, lg: 12 }} 
      outline={'2px solid'} outlineColor={primary}
      borderRadius={'lg'}
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      >
        <PagesMenu currentPage={getCurrentPage()} />
          <Box h="auto" w="100%" 
          
          >
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/calculator" element={<CommisionCalculator />} />
              <Route path="/todoNotes" element={<ToDoNotes />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clientManagement" element={<ClientManagement />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/aiAssistance" element={<AiAssistance />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signout" element={<Signout />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/learnMore" element={<LearnMore />} />
              <Route path="/about" element={<About />} />
              <Route path="/policies" element={<Policies />} />
            </Routes>
        </Box>

      </Box>
      <Footer />
    </Box>
  );
}

export default App;
