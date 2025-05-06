import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TimelineIcon from '@mui/icons-material/Timeline';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';

const MotionBox = motion(Box);

const features = [
  {
    icon: <PsychologyIcon sx={{ fontSize: 40, color: '#4FC3F7' }} />,
    title: 'Personalized Learning',
    description: 'AI-driven content adaptation to match your learning style and pace',
    link: '/learning-path',
  },
  {
    icon: <ChatIcon sx={{ fontSize: 40, color: '#4FC3F7' }} />,
    title: 'AI Support',
    description: '24/7 intelligent chatbot assistance for instant help and guidance',
    link: '/chat',
  },
  {
    icon: <TimelineIcon sx={{ fontSize: 40, color: '#4FC3F7' }} />,
    title: 'Progress Tracking',
    description: 'Real-time analytics and adaptive progress monitoring',
    link: '/dashboard',
  },
];

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  color="white"
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  Welcome to BrainX
                  <SchoolIcon sx={{ fontSize: 48, color: '#4FC3F7' }} />
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                  Revolutionize your learning experience with AI-powered personalization,
                  instant support, and adaptive progress tracking.
                </Typography>
                <Link to="/learning-path" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ 
                      mt: 4,
                      bgcolor: '#4FC3F7',
                      color: '#1e1e1e',
                      '&:hover': {
                        bgcolor: '#29B6F6'
                      }
                    }}
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </Button>
                </Link>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Remove the large SchoolIcon here since we moved it next to the title */}
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="white"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose BrainX?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Link to={feature.link} style={{ textDecoration: 'none' }}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      bgcolor: 'background.paper',
                      cursor: 'pointer',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h5" component="h3" gutterBottom color="white">
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Link>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 