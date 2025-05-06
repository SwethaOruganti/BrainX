import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Box,
  Typography,
  Button,
  LinearProgress,
  Grid,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function CourseProgressCard({ course }) {
  const navigate = useNavigate();

  const handleResume = () => {
    navigate('/learning-path', {
      state: {
        courseTitle: course.title,
        videoUrl: course.videoUrl
      }
    });
  };

  // Calculate remaining time in minutes
  const getRemainingTime = () => {
    const totalDuration = course.totalDuration; // in seconds
    const currentStep = course.currentStep;
    const currentStepTime = course.timestamps[currentStep]?.seconds || 0;
    const remainingSeconds = totalDuration - currentStepTime;
    const remainingMinutes = Math.ceil(remainingSeconds / 60);
    return remainingMinutes;
  };

  // Calculate progress percentage
  const getProgress = () => {
    const currentStep = course.currentStep;
    const totalSteps = course.timestamps.length;
    return (currentStep / totalSteps) * 100;
  };

  return (
    <Paper 
      elevation={0}
      sx={{
        bgcolor: 'rgba(13, 19, 23, 0.6)',
        borderRadius: '16px',
        border: '2px solid #4FC3F7',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(79, 195, 247, 0.1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          border: '2px solid #81D4FA',
          boxShadow: '0 0 30px rgba(79, 195, 247, 0.2)'
        }
      }}
    >
      <Grid container>
        {/* Left Section */}
        <Grid item xs={12} md={8}>
          <Box sx={{ p: 3 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white',
                fontWeight: 600,
                mb: 1
              }}
            >
              {course.title}
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              <AccessTimeIcon sx={{ fontSize: '1rem', mr: 1 }} />
              <Typography variant="body2">
                {getRemainingTime()} minutes remaining
              </Typography>
            </Box>

            <Box sx={{ mb: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={getProgress()} 
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#4FC3F7',
                    borderRadius: 3
                  }
                }}
              />
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.875rem'
              }}
            >
              {Math.round(getProgress())}% Complete
            </Typography>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              p: 3,
              width: '100%',
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'center' },
              borderLeft: { xs: 'none', md: '1px solid rgba(79, 195, 247, 0.2)' }
            }}
          >
            <Button
              variant="contained"
              onClick={handleResume}
              startIcon={<PlayArrowIcon />}
              sx={{
                bgcolor: '#4FC3F7',
                color: '#0A1929',
                px: 3,
                py: 1.2,
                borderRadius: '12px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#81D4FA',
                  transform: 'scale(1.02)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Resume Course
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CourseProgressCard; 