import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  CircularProgress,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
  IconButton,
  LinearProgress,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function LearningPath() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseTitle, videoUrl } = location.state || {};
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState('0:00');
  const [timestamps, setTimestamps] = useState([
    {
      time: '0:00',
      seconds: 0,
      title: 'Introduction',
      description: 'Getting started with the basics'
    },
    {
      time: '5:00',
      seconds: 300,
      title: 'Core Concepts',
      description: 'Understanding the fundamental concepts'
    },
    {
      time: '10:00',
      seconds: 600,
      title: 'Implementation',
      description: 'Implementing what we learned'
    },
    {
      time: '15:00',
      seconds: 900,
      title: 'Practice',
      description: 'Practice with examples'
    },
    {
      time: '20:00',
      seconds: 1200,
      title: 'Conclusion',
      description: 'Wrapping up and next steps'
    }
  ]);
  const [homeworkCompleted, setHomeworkCompleted] = useState({});
  const [finalTaskCompleted, setFinalTaskCompleted] = useState(false);

  // Add theme and media queries for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getVideoId = () => {
    if (!videoUrl) return '';
    return videoUrl.split('v=')[1];
  };

  const getTimestampsForCourse = (courseTitle) => {
    const title = courseTitle.toLowerCase();
    
    // Programming Language Courses (JavaScript, Python, Java, etc.)
    if (title.includes('javascript') || title.includes('python') || title.includes('java') || 
        title.includes('c++') || title.includes('c#') || title.includes('kotlin') || 
        title.includes('swift') || title.includes('go') || title.includes('rust') || 
        title.includes('php') || title.includes('ruby') || title.includes('scala') || 
        title.includes('typescript')) {
      return [
        {
          time: '0:00',
          seconds: 0,
          title: `Introduction to ${courseTitle}`,
          description: `Get started with ${courseTitle} and understand the basics`
        },
        {
          time: '10:00',
          seconds: 600,
          title: 'Syntax and Data Types',
          description: 'Learn the fundamental syntax and data types'
        },
        {
          time: '25:00',
          seconds: 1500,
          title: 'Functions and Control Flow',
          description: 'Understanding functions, loops, and control structures'
        },
        {
          time: '45:00',
          seconds: 2700,
          title: 'Object-Oriented Programming',
          description: 'Learn about classes, objects, and OOP concepts'
        },
        {
          time: '1:15:00',
          seconds: 4500,
          title: 'Advanced Topics',
          description: 'Explore advanced features and best practices'
        }
      ];
    }
    
    // Web Development (HTML, CSS)
    else if (title.includes('html') || title.includes('css')) {
      return [
        {
          time: '0:00',
          seconds: 0,
          title: `Introduction to ${courseTitle}`,
          description: 'Understanding the basics and setup'
        },
        {
          time: '8:00',
          seconds: 480,
          title: 'Basic Structure and Syntax',
          description: 'Learn the fundamental structure and syntax'
        },
        {
          time: '20:00',
          seconds: 1200,
          title: 'Elements and Properties',
          description: 'Working with different elements and properties'
        },
        {
          time: '35:00',
          seconds: 2100,
          title: 'Layout and Positioning',
          description: 'Understanding layout and positioning techniques'
        },
        {
          time: '50:00',
          seconds: 3000,
          title: 'Best Practices',
          description: 'Learn about best practices and advanced techniques'
        }
      ];
    }
    
    // Frameworks (React, Node.js)
    else if (title.includes('react') || title.includes('node')) {
      return [
        {
          time: '0:00',
          seconds: 0,
          title: `Introduction to ${courseTitle}`,
          description: 'Getting started with the framework'
        },
        {
          time: '15:00',
          seconds: 900,
          title: 'Core Concepts',
          description: 'Understanding the core concepts and architecture'
        },
        {
          time: '35:00',
          seconds: 2100,
          title: 'Components and Modules',
          description: 'Working with components and modules'
        },
        {
          time: '55:00',
          seconds: 3300,
          title: 'State Management',
          description: 'Managing state and data flow'
        },
        {
          time: '1:20:00',
          seconds: 4800,
          title: 'Advanced Features',
          description: 'Exploring advanced features and optimization'
        }
      ];
    }
    
    // Default Learning Path
    return [
      {
        time: '0:00',
        seconds: 0,
        title: 'Introduction',
        description: 'Getting started with the basics'
      },
      {
        time: '12:00',
        seconds: 720,
        title: 'Core Concepts',
        description: 'Understanding the fundamental concepts'
      },
      {
        time: '25:00',
        seconds: 1500,
        title: 'Practical Examples',
        description: 'Learning through practical examples'
      },
      {
        time: '40:00',
        seconds: 2400,
        title: 'Advanced Topics',
        description: 'Exploring advanced topics and techniques'
      },
      {
        time: '55:00',
        seconds: 3300,
        title: 'Best Practices',
        description: 'Understanding best practices and optimization'
      }
    ];
  };

  useEffect(() => {
    if (courseTitle) {
      const newTimestamps = getTimestampsForCourse(courseTitle);
      setTimestamps(newTimestamps);
    }
    setLoading(false);
  }, [courseTitle]);

  // Calculate total duration from the last timestamp
  const getTotalDuration = (timestamps) => {
    const lastTimestamp = timestamps[timestamps.length - 1];
    return lastTimestamp.seconds;
  };

  // Function to get homework for each step based on course type
  const getHomeworkForStep = (courseTitle, stepIndex, stepTitle) => {
    const title = courseTitle.toLowerCase();
    
    // Programming Language Courses
    if (title.includes('javascript') || title.includes('python') || title.includes('java')) {
      const homeworks = [
        {
          title: 'Basic Syntax Practice',
          tasks: [
            'Create variables using different data types',
            'Write a function that performs basic arithmetic',
            'Implement a simple conditional statement'
          ],
          weight: 5
        },
        {
          title: 'Data Structures Implementation',
          tasks: [
            'Create and manipulate an array/list',
            'Implement a basic dictionary/object',
            'Practice string manipulation'
          ],
          weight: 10
        },
        {
          title: 'Function Mastery',
          tasks: [
            'Write a recursive function',
            'Implement error handling',
            'Create a higher-order function'
          ],
          weight: 15
        },
        {
          title: 'OOP Concepts',
          tasks: [
            'Create a class with properties and methods',
            'Implement inheritance',
            'Practice encapsulation'
          ],
          weight: 20
        },
        {
          title: 'Final Project',
          tasks: [
            'Build a complete application',
            'Implement all learned concepts',
            'Add documentation and tests'
          ],
          weight: 30
        }
      ];
      return homeworks[stepIndex];
    }
    
    // Web Development (HTML/CSS)
    if (title.includes('html') || title.includes('css')) {
      const homeworks = [
        {
          title: 'Structure Practice',
          tasks: [
            'Create a basic HTML structure',
            'Add semantic elements',
            'Include proper meta tags'
          ],
          weight: 5
        },
        {
          title: 'Styling Fundamentals',
          tasks: [
            'Style text elements',
            'Create a responsive layout',
            'Implement flexbox/grid'
          ],
          weight: 10
        },
        {
          title: 'Advanced Layout',
          tasks: [
            'Create a complex navigation',
            'Build a responsive form',
            'Implement animations'
          ],
          weight: 15
        },
        {
          title: 'Component Building',
          tasks: [
            'Create reusable components',
            'Implement responsive design patterns',
            'Add interactive elements'
          ],
          weight: 20
        },
        {
          title: 'Portfolio Project',
          tasks: [
            'Build a complete portfolio',
            'Implement responsive design',
            'Add animations and interactions'
          ],
          weight: 30
        }
      ];
      return homeworks[stepIndex];
    }
    
    // Default homework structure
    return {
      title: `${stepTitle} Practice`,
      tasks: [
        'Review and practice key concepts',
        'Complete hands-on exercises',
        'Build a mini-project'
      ],
      weight: stepIndex === timestamps.length - 1 ? 30 : 10
    };
  };

  // Calculate total progress including homework and final task
  const calculateTotalProgress = () => {
    let progress = 0;
    let totalWeight = 0;
    
    // Calculate progress from steps and homework
    timestamps.forEach((_, index) => {
      const homework = getHomeworkForStep(courseTitle, index, timestamps[index].title);
      totalWeight += homework.weight;
      
      if (completed[index]) progress += homework.weight * 0.5; // 50% for completing the video
      if (homeworkCompleted[index]) progress += homework.weight * 0.5; // 50% for completing homework
    });
    
    // Add final task weight
    const finalTaskWeight = 20;
    totalWeight += finalTaskWeight;
    if (finalTaskCompleted) progress += finalTaskWeight;
    
    return Math.round((progress / totalWeight) * 100);
  };

  // Save progress including homework and final task
  const saveCourseProgress = () => {
    const courseProgress = {
      title: courseTitle,
      videoUrl: videoUrl,
      currentStep: activeStep,
      timestamps: timestamps,
      totalDuration: getTotalDuration(timestamps),
      lastAccessed: new Date().toISOString(),
      completed: completed,
      homeworkCompleted: homeworkCompleted,
      finalTaskCompleted: finalTaskCompleted,
      totalProgress: calculateTotalProgress()
    };

    const savedCourses = JSON.parse(localStorage.getItem('courseProgress') || '[]');
    const courseIndex = savedCourses.findIndex(course => course.title === courseTitle);
    
    if (courseIndex !== -1) {
      savedCourses[courseIndex] = courseProgress;
    } else {
      savedCourses.push(courseProgress);
    }

    localStorage.setItem('courseProgress', JSON.stringify(savedCourses));
  };

  // Handle homework completion
  const handleHomeworkComplete = (stepIndex) => {
    const newHomeworkCompleted = { ...homeworkCompleted };
    newHomeworkCompleted[stepIndex] = true;
    setHomeworkCompleted(newHomeworkCompleted);
    saveCourseProgress();
  };

  // Handle final task completion
  const handleFinalTaskComplete = () => {
    setFinalTaskCompleted(true);
    saveCourseProgress();
  };

  // Load saved progress
  useEffect(() => {
    if (courseTitle) {
      const savedCourses = JSON.parse(localStorage.getItem('courseProgress') || '[]');
      const savedCourse = savedCourses.find(course => course.title === courseTitle);
      
      if (savedCourse) {
        setActiveStep(savedCourse.currentStep);
        setCompleted(savedCourse.completed || {});
        setHomeworkCompleted(savedCourse.homeworkCompleted || {});
        setFinalTaskCompleted(savedCourse.finalTaskCompleted || false);
      }
    }
  }, [courseTitle]);

  const handleStep = (step) => () => {
    setActiveStep(step);
    if (showVideo) {
      const videoElement = document.querySelector('iframe');
      if (videoElement) {
        const newSrc = `https://www.youtube.com/embed/${getVideoId()}?start=${timestamps[step].seconds}&autoplay=1`;
        videoElement.src = newSrc;
      }
    }
    saveCourseProgress();
  };

  const handleComplete = (step) => {
    const newCompleted = { ...completed };
    newCompleted[step] = true;
    setCompleted(newCompleted);
    saveCourseProgress();
  };

  const handleWatchSection = (timestamp, seconds) => {
    setCurrentTimestamp(timestamp);
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  const handleGoToCourses = () => {
    navigate('/courses');
  };

  if (!courseTitle) {
    return (
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: { xs: 2, sm: 4, md: 6 }, 
          mb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Paper sx={{
          bgcolor: 'rgba(13, 19, 23, 0.4)',
          borderRadius: { xs: '12px', sm: '14px', md: '16px' },
          p: { xs: 3, sm: 4, md: 5 },
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(79, 195, 247, 0.2)',
          textAlign: 'center'
        }}>
          <SchoolIcon sx={{ fontSize: 60, color: '#4FC3F7', mb: 2 }} />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            sx={{ 
              color: 'white',
              mb: 2,
              fontWeight: 600
            }}
          >
            No Course Selected
          </Typography>
          <Typography sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.1rem' }
          }}>
            Please select a course from our course catalog to start your learning journey.
          </Typography>
          <Button
            variant="contained"
            onClick={handleGoToCourses}
            startIcon={<PlayArrowIcon />}
            sx={{
              bgcolor: '#4FC3F7',
              color: '#0A1929',
              fontWeight: 500,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': { 
                bgcolor: '#81D4FA',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease'
              }
            }}
          >
            Browse Courses
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        mt: { xs: 2, sm: 4, md: 6 }, 
        mb: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        sx={{ 
          color: 'white', 
          mb: { xs: 2, sm: 3, md: 4 }, 
          fontWeight: 600,
          borderBottom: '2px solid #4FC3F7',
          pb: 2,
          display: 'inline-block',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
        }}
      >
        {courseTitle} Learning Path
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress sx={{ color: '#4FC3F7' }} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <Stepper 
                activeStep={activeStep} 
                alternativeLabel
                orientation={isMobile ? 'vertical' : 'horizontal'}
                sx={{
                  '& .MuiStepLabel-label': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    mt: 1,
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    '&.Mui-active': { color: '#4FC3F7' },
                    '&.Mui-completed': { color: '#81D4FA' }
                  },
                  '& .MuiStepIcon-root': {
                    color: 'rgba(79, 195, 247, 0.3)',
                    width: { xs: '30px', sm: '35px', md: '40px' },
                    height: { xs: '30px', sm: '35px', md: '40px' },
                    '&.Mui-active': { color: '#4FC3F7' },
                    '&.Mui-completed': { color: '#81D4FA' }
                  },
                  mb: { xs: 2, sm: 3, md: 4 }
                }}
              >
                {timestamps.map((step, index) => (
                  <Step key={index} completed={completed[index]}>
                    <StepLabel 
                      onClick={handleStep(index)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          '& .MuiStepLabel-label': {
                            color: '#81D4FA'
                          }
                        }
                      }}
                    >
                      <Typography sx={{ 
                        color: 'white',
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        fontWeight: 500,
                        textAlign: 'center'
                      }}>
                        {step.title}
                      </Typography>
                      <Typography sx={{ 
                        color: '#4FC3F7',
                        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }
                      }}>
                        {step.time}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {showVideo && (
                <Paper sx={{
                  bgcolor: 'rgba(13, 19, 23, 0.4)',
                  borderRadius: { xs: '12px', sm: '14px', md: '16px' },
                  p: { xs: 2, sm: 3, md: 4 },
                  backdropFilter: 'blur(10px)',
                  border: '2px solid #4FC3F7',
                  boxShadow: '0 0 10px rgba(79, 195, 247, 0.3)',
                  mt: 3,
                  position: 'relative'
                }}>
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8, 
                    zIndex: 1 
                  }}>
                    <IconButton 
                      onClick={handleCloseVideo}
                      sx={{ 
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.7)'
                        }
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ 
                    position: 'relative',
                    paddingTop: '56.25%',
                    width: '100%',
                    border: '2px solid #4FC3F7',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <iframe
                      title={`${timestamps[activeStep].title} - ${courseTitle}`}
                      src={`https://www.youtube.com/embed/${getVideoId()}?start=${timestamps[activeStep].seconds}&autoplay=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  </Box>
                </Paper>
              )}

              <Paper sx={{
                bgcolor: 'rgba(13, 19, 23, 0.4)',
                borderRadius: { xs: '12px', sm: '14px', md: '16px' },
                p: { xs: 2, sm: 3, md: 4 },
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(79, 195, 247, 0.2)',
                mt: 3
              }}>
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  sx={{ 
                    color: 'white',
                    mb: { xs: 1, sm: 1.5, md: 2 },
                    fontWeight: 500,
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                  }}
                >
                  {timestamps[activeStep].title}
                </Typography>
                <Typography sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: { xs: 2, sm: 2.5, md: 3 },
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  lineHeight: 1.6
                }}>
                  {timestamps[activeStep].description}
                </Typography>

                {/* Homework Section */}
                <Box sx={{ mt: 4, mb: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#4FC3F7',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 2
                    }}
                  >
                    <AssignmentIcon /> Homework Assignment
                  </Typography>
                  
                  <Box sx={{ 
                    bgcolor: 'rgba(79, 195, 247, 0.1)',
                    borderRadius: '8px',
                    p: 2,
                    border: '1px solid rgba(79, 195, 247, 0.2)'
                  }}>
                    <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                      {getHomeworkForStep(courseTitle, activeStep, timestamps[activeStep].title).title}
                    </Typography>
                    
                    <Box component="ul" sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 2 }}>
                      {getHomeworkForStep(courseTitle, activeStep, timestamps[activeStep].title).tasks.map((task, index) => (
                        <Typography component="li" key={index} sx={{ mb: 0.5 }}>
                          {task}
                        </Typography>
                      ))}
                    </Box>
                    
                    <Typography variant="caption" sx={{ display: 'block', color: '#4FC3F7', mt: 2 }}>
                      This assignment contributes {getHomeworkForStep(courseTitle, activeStep, timestamps[activeStep].title).weight}% to your overall progress
                    </Typography>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 1, sm: 1.5, md: 2 },
                  flexDirection: { xs: 'column', sm: 'row' }
                }}>
                  <Button
                    variant="contained"
                    onClick={() => handleWatchSection(timestamps[activeStep].time, timestamps[activeStep].seconds)}
                    startIcon={<PlayArrowIcon />}
                    fullWidth={isMobile}
                    sx={{
                      bgcolor: '#4FC3F7',
                      color: '#0A1929',
                      fontWeight: 500,
                      px: { xs: 2, sm: 2.5, md: 3 },
                      py: { xs: 1, sm: 1.2, md: 1.5 },
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      '&:hover': { 
                        bgcolor: '#81D4FA',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    Watch This Section
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleComplete(activeStep)}
                    startIcon={<CheckCircleIcon />}
                    fullWidth={isMobile}
                    sx={{
                      color: completed[activeStep] ? '#81D4FA' : '#4FC3F7',
                      borderColor: completed[activeStep] ? '#81D4FA' : '#4FC3F7',
                      fontWeight: 500,
                      px: { xs: 2, sm: 2.5, md: 3 },
                      py: { xs: 1, sm: 1.2, md: 1.5 },
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      '&:hover': {
                        borderColor: '#81D4FA',
                        color: '#81D4FA',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    {completed[activeStep] ? 'Completed' : 'Mark Video as Complete'}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => handleHomeworkComplete(activeStep)}
                    startIcon={<AssignmentIcon />}
                    fullWidth={isMobile}
                    disabled={!completed[activeStep]}
                    sx={{
                      color: homeworkCompleted[activeStep] ? '#81D4FA' : '#4FC3F7',
                      borderColor: homeworkCompleted[activeStep] ? '#81D4FA' : '#4FC3F7',
                      fontWeight: 500,
                      px: { xs: 2, sm: 2.5, md: 3 },
                      py: { xs: 1, sm: 1.2, md: 1.5 },
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      '&:hover': {
                        borderColor: '#81D4FA',
                        color: '#81D4FA',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    {homeworkCompleted[activeStep] ? 'Homework Completed' : 'Mark Homework as Complete'}
                  </Button>
                </Box>

                {/* Final Task Section (shown only on last step) */}
                {activeStep === timestamps.length - 1 && (
                  <Box sx={{ mt: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#4FC3F7',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2
                      }}
                    >
                      <EmojiEventsIcon /> Final Project
                    </Typography>
                    
                    <Box sx={{ 
                      bgcolor: 'rgba(79, 195, 247, 0.1)',
                      borderRadius: '8px',
                      p: 2,
                      border: '1px solid rgba(79, 195, 247, 0.2)'
                    }}>
                      <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                        Course Completion Project
                      </Typography>
                      
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                        Apply everything you've learned in this course by building a comprehensive project that demonstrates your mastery of the subject matter.
                      </Typography>
                      
                      <Typography variant="caption" sx={{ display: 'block', color: '#4FC3F7', mb: 2 }}>
                        This final project contributes 20% to your overall progress
                      </Typography>

                      <Button
                        variant="contained"
                        onClick={handleFinalTaskComplete}
                        startIcon={<EmojiEventsIcon />}
                        disabled={!Object.keys(completed).length === timestamps.length}
                        sx={{
                          bgcolor: finalTaskCompleted ? '#81D4FA' : '#4FC3F7',
                          color: '#0A1929',
                          px: 3,
                          py: 1.5,
                          borderRadius: '8px',
                          '&:hover': {
                            bgcolor: '#81D4FA',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.2s ease'
                          }
                        }}
                      >
                        {finalTaskCompleted ? 'Final Project Completed' : 'Mark Final Project as Complete'}
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Progress Summary */}
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                    Overall Course Progress: {calculateTotalProgress()}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={calculateTotalProgress()} 
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#4FC3F7',
                        borderRadius: 4
                      }
                    }}
                  />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default LearningPath; 