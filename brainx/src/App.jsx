import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LearningPath from './pages/LearningPath';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Box, Container } from '@mui/material';
import Courses from './pages/Courses';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4FC3F7',
      light: '#81D4FA',
      dark: '#29B6F6',
      contrastText: '#000000',
    },
    secondary: {
      main: '#03A9F4',
      light: '#4FC3F7',
      dark: '#0288D1',
      contrastText: '#000000',
    },
    background: {
      default: '#0A0A0A',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(79, 195, 247, 0.12)',
    action: {
      active: '#4FC3F7',
      hover: 'rgba(79, 195, 247, 0.08)',
      selected: 'rgba(79, 195, 247, 0.16)',
      disabled: 'rgba(79, 195, 247, 0.3)',
      disabledBackground: 'rgba(79, 195, 247, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '4rem',
      letterSpacing: '-0.02em',
      color: '#4FC3F7',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.01em',
      color: '#4FC3F7',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#81D4FA',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#81D4FA',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1.1rem',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 32px',
          fontSize: '1.1rem',
        },
        contained: {
          boxShadow: 'none',
          backgroundColor: '#4FC3F7',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#29B6F6',
            boxShadow: '0 4px 12px rgba(79, 195, 247, 0.2)',
          },
        },
        outlined: {
          borderColor: '#4FC3F7',
          color: '#4FC3F7',
          '&:hover': {
            borderColor: '#81D4FA',
            backgroundColor: 'rgba(79, 195, 247, 0.08)',
          },
        },
        text: {
          color: '#4FC3F7',
          '&:hover': {
            backgroundColor: 'rgba(79, 195, 247, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 24,
          border: '2px solid',
          borderColor: 'rgba(79, 195, 247, 0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backgroundImage: 'none',
          border: '2px solid',
          borderColor: 'rgba(79, 195, 247, 0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0A0A0A',
          borderBottom: '2px solid rgba(79, 195, 247, 0.12)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '32px',
          paddingRight: '32px',
          '@media (min-width: 600px)': {
            paddingLeft: '48px',
            paddingRight: '48px',
          },
          '@media (min-width: 1200px)': {
            paddingLeft: '64px',
            paddingRight: '64px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontSize: '1.1rem',
            '& fieldset': {
              borderColor: 'rgba(79, 195, 247, 0.23)',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#4FC3F7',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4FC3F7',
            },
          },
        },
      },
    },
  },
});

// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return null; // or a loading spinner
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}>
            <Navbar />
            <Container 
              component="main" 
              maxWidth="xl" 
              sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                py: 6,
                px: { xs: 3, sm: 5, md: 7 },
                '@media (min-width: 1200px)': {
                  px: 10,
                },
                height: 'calc(100vh - 72px)', // Subtract navbar height
                overflow: 'auto',
              }}
            >
              <Box sx={{ 
                width: '100%',
                maxWidth: '1600px',
                mx: 'auto',
                height: '100%',
              }}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/" element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  } />
                  <Route path="/dashboard" element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/courses" element={
                    <PrivateRoute>
                      <Courses />
                    </PrivateRoute>
                  } />
                  <Route path="/learning-path" element={
                    <PrivateRoute>
                      <LearningPath />
                    </PrivateRoute>
                  } />
                  <Route path="/chat" element={
                    <PrivateRoute>
                      <Chat />
                    </PrivateRoute>
                  } />
                </Routes>
              </Box>
            </Container>
          </Box>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
