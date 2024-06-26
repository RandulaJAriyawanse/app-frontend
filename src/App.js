import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import EmailExample from './pages/Email.js/App';
import EmailVerification from './pages/EmailVerification';
import Layout from './wrappers/Layout';
import EmailTest from './pages/EmailTest';
import FlightChatPage from './pages/FlightChatPage';

import CssBaseline from '@mui/material/CssBaseline';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';

import { pink } from '@mui/material/colors';

const materialTheme = materialExtendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: pink[600],
        },
      },
    },
    dark: {
      palette: {
        // primary: {
        //   main: pink[400],
        // },
        background: {
          default: '#191e23',  
          paper: '#191e23',
        },

        
      },
      typography: {
        // Apply the primary text color globally to all Typography components
        allVariants: {
          color: '#dcebfa',
        },
      },
    },
  },
});


function App() {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider >
      <CssBaseline enableColorScheme />

      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/email" element={<EmailExample />} />
            <Route path="/testemail" element={<EmailTest />} />
            <Route path="/flightchat" element={<FlightChatPage />} />
            <Route path="dj-rest-auth/registration/account-confirm-email/:key/" element={<EmailVerification />} />
          </Routes>
        </Layout>
      </Router>
    </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

export default App;
