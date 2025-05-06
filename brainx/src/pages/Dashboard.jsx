import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import CourseProgressCard from '../components/CourseProgressCard';

// Custom icons to match the design
const ActiveCoursesIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="#4FC3F7"/>
    <path d="M15 20H25M20 15V25" stroke="#4FC3F7" strokeWidth="2"/>
  </svg>
);

const TopicsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="15" stroke="#4FC3F7" strokeWidth="2"/>
    <path d="M15 20L18 23L25 17" stroke="#4FC3F7" strokeWidth="2"/>
  </svg>
);

const TimeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="15" stroke="#4FC3F7" strokeWidth="2"/>
    <path d="M20 12V20L25 25" stroke="#4FC3F7" strokeWidth="2"/>
  </svg>
);

const AchievementsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 35L10 25L20 15L30 25L20 35Z" stroke="#4FC3F7" strokeWidth="2"/>
    <path d="M15 25H25" stroke="#4FC3F7" strokeWidth="2"/>
  </svg>
);

function Dashboard() {
  const [activeCourses, setActiveCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Load active courses from localStorage
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courseProgress') || '[]');
    const sortedCourses = savedCourses.sort((a, b) => 
      new Date(b.lastAccessed) - new Date(a.lastAccessed)
    );
    setActiveCourses(sortedCourses);
    setFilteredCourses(sortedCourses);
  }, []);

  // Handle search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = activeCourses.filter(course => 
      course.title.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(13,19,23,1) 0%, rgba(20,29,47,1) 100%)',
        pb: 8
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            pt: { xs: 4, md: 8 },
            pb: { xs: 4, md: 6 },
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200%',
              height: '100%',
              background: 'radial-gradient(circle, rgba(79,195,247,0.1) 0%, rgba(13,19,23,0) 70%)',
              zIndex: 0,
              pointerEvents: 'none'
            }
          }}
        >
          <Typography 
            variant="h2" 
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              background: 'linear-gradient(90deg, #4FC3F7 0%, #81D4FA 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              position: 'relative',
              zIndex: 1
            }}
          >
            Welcome Learner!
          </Typography>
          <Typography 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: { xs: '1rem', md: '1.2rem' },
              maxWidth: '600px',
              mx: 'auto',
              mb: 4,
              position: 'relative',
              zIndex: 1
            }}
          >
            Continue your learning journey with personalized courses and AI-powered support.
          </Typography>

          {activeCourses.length > 0 && (
            <Box sx={{ maxWidth: '500px', mx: 'auto', mb: 6, position: 'relative', zIndex: 1 }}>
              <TextField
                label="Search courses"
                placeholder="Search your courses..."
                value={searchQuery}
                onChange={handleSearch}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#4FC3F7' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    position: 'relative',
                    transform: 'none',
                    marginBottom: '8px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: '#4FC3F7'
                    }
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '& .MuiOutlinedInput-root': {
                    height: '48px',
                    backgroundColor: 'rgba(13, 19, 23, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(79, 195, 247, 0.2)',
                    transition: 'all 0.3s ease',
                    '& fieldset': { 
                      border: 'none',
                      outline: 'none'
                    },
                    '&:hover': {
                      border: '1px solid rgba(79, 195, 247, 0.4)',
                      backgroundColor: 'rgba(13, 19, 23, 0.7)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(79, 195, 247, 0.1)'
                    },
                    '&.Mui-focused': {
                      border: '1px solid rgba(79, 195, 247, 0.6)',
                      backgroundColor: 'rgba(13, 19, 23, 0.8)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(79, 195, 247, 0.15)'
                    },
                    '& input': {
                      color: 'white',
                      fontSize: '1rem',
                      textAlign: 'left',
                      paddingLeft: '48px',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.5)',
                        opacity: 1
                      }
                    }
                  }
                }}
              />
            </Box>
          )}
        </Box>

        {/* Active Courses Section */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 4,
              gap: 2
            }}
          >
            <SchoolIcon sx={{ color: '#4FC3F7', fontSize: '2rem' }} />
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white',
                fontWeight: 600
              }}
            >
              Active Courses
            </Typography>
          </Box>

          {activeCourses.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {filteredCourses.map((course, index) => (
                  <Grid item xs={12} key={index}>
                    <CourseProgressCard course={course} />
                  </Grid>
                ))}
              </Grid>
              {filteredCourses.length === 0 && (
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    py: 6,
                    px: 3,
                    bgcolor: 'rgba(13, 19, 23, 0.6)',
                    borderRadius: '24px',
                    border: '1px solid rgba(79, 195, 247, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Typography 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '1.1rem'
                    }}
                  >
                    No courses found matching "{searchQuery}"
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <Box 
              sx={{ 
                textAlign: 'center',
                py: 8,
                px: 3,
                bgcolor: 'rgba(13, 19, 23, 0.6)',
                borderRadius: '24px',
                border: '1px solid rgba(79, 195, 247, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <SchoolIcon sx={{ color: '#4FC3F7', fontSize: '3rem', mb: 2, opacity: 0.7 }} />
              <Typography 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '1.1rem',
                  mb: 3
                }}
              >
                No active courses yet. Start your learning journey today!
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/courses')}
                sx={{
                  bgcolor: '#4FC3F7',
                  color: '#0A1929',
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#81D4FA'
                  }
                }}
              >
                Browse Courses
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard; 