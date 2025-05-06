import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Typography,
  Button,
  Link,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';

const popularTutorials = {
  'javascript': 'PkZNo7MFNFg',
  'python': 'rfscVS0vtbw',
  'java': 'eIrMbAQSU34',
  'react': 'w7ejDZ8SWv8',
  'node.js': 'TlB_eWDSMt4',
  'html': 'pQN-pnXPaVg',
  'css': '1Rs2ND1ryYc',
  'sql': 'HXV3zeQKqGY',
  'git': '8JJ101D3knE',
  'web development': 'Q8NPQ2RPhHE',
  'programming': 'zOjov-2OZ0E',
  'coding': 'HIj8wU_rGIU',
  'computer science': 'i_LwzRVP7bg',
  'kotlin': 'I6r0lMgxfFE',
  'swift': '8Xg7E9shq0U',
  'c++': 'vLnPwxZdK4Y',
  'c#': 'GhQdlIFylQ8',
  'go': 'yyUHQIec83I',
  'rust': 'zF34dRivLOw',
  'php': 'OK_JCtrrv-c',
  'ruby': 't_ispmWndjY',
  'scala': 'DzxF-0PT2EU',
  'typescript': '30LWjhZzg50'
};

// Update the paidCourses object with more courses and better categorization
const paidCourses = {
  'javascript': [
    { title: 'The Complete JavaScript Course 2024', platform: 'Udemy', rating: 4.8, url: 'https://www.udemy.com/course/the-complete-javascript-course/', instructor: 'Jonas Schmedtmann', price: '$19.99', students: '850,000+' },
    { title: 'JavaScript Algorithms and Data Structures', platform: 'Coursera', rating: 4.9, url: 'https://www.coursera.org/specializations/data-structures-algorithms', instructor: 'University of California', price: '$49/month', students: '1M+' }
  ],
  'python': [
    { title: 'Python for Everybody Specialization', platform: 'Coursera', rating: 4.8, url: 'https://www.coursera.org/specializations/python', instructor: 'University of Michigan', price: '$49/month', students: '2M+' },
    { title: 'Complete Python Bootcamp', platform: 'Udemy', rating: 4.7, url: 'https://www.udemy.com/course/complete-python-bootcamp/', instructor: 'Jose Portilla', price: '$19.99', students: '1.2M+' }
  ],
  'html': [
    { title: 'Build Responsive Websites with HTML & CSS', platform: 'Udemy', rating: 4.8, url: 'https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/', instructor: 'Jonas Schmedtmann', price: '$19.99', students: '650,000+' },
    { title: 'HTML, CSS, and Javascript for Web Developers', platform: 'Coursera', rating: 4.7, url: 'https://www.coursera.org/learn/html-css-javascript-for-web-developers', instructor: 'Johns Hopkins University', price: '$49/month', students: '500,000+' }
  ],
  'css': [
    { title: 'Advanced CSS and Sass: Flexbox, Grid, Animations', platform: 'Udemy', rating: 4.8, url: 'https://www.udemy.com/course/advanced-css-and-sass/', instructor: 'Jonas Schmedtmann', price: '$19.99', students: '420,000+' },
    { title: 'CSS Basics to Advanced', platform: 'Coursera', rating: 4.7, url: 'https://www.coursera.org/learn/css-basics', instructor: 'University of Michigan', price: '$49/month', students: '300,000+' }
  ],
  'react': [
    { title: 'React - The Complete Guide 2024', platform: 'Udemy', rating: 4.8, url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', instructor: 'Maximilian Schwarzmüller', price: '$19.99', students: '900,000+' },
    { title: 'Front-End Development with React', platform: 'Coursera', rating: 4.7, url: 'https://www.coursera.org/specializations/front-end-react', instructor: 'Meta', price: '$49/month', students: '400,000+' }
  ],
  'node.js': [
    { title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp', platform: 'Udemy', rating: 4.8, url: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/', instructor: 'Jonas Schmedtmann', price: '$19.99', students: '350,000+' },
    { title: 'Server-side Development with NodeJS', platform: 'Coursera', rating: 4.8, url: 'https://www.coursera.org/learn/server-side-nodejs', instructor: 'The Hong Kong University', price: '$49/month', students: '200,000+' }
  ],
  'java': [
    { title: 'Java Programming Masterclass', platform: 'Udemy', rating: 4.7, url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/', instructor: 'Tim Buchalka', price: '$19.99', students: '750,000+' },
    { title: 'Java Programming and Software Engineering Fundamentals', platform: 'Coursera', rating: 4.8, url: 'https://www.coursera.org/specializations/java-programming', instructor: 'Duke University', price: '$49/month', students: '900,000+' }
  ],
  'sql': [
    { title: 'The Complete SQL Bootcamp', platform: 'Udemy', rating: 4.7, url: 'https://www.udemy.com/course/the-complete-sql-bootcamp/', instructor: 'Jose Portilla', price: '$19.99', students: '550,000+' },
    { title: 'SQL for Data Science', platform: 'Coursera', rating: 4.8, url: 'https://www.coursera.org/learn/sql-for-data-science', instructor: 'UC Davis', price: '$49/month', students: '400,000+' }
  ],
  'web development': [
    { title: 'The Complete Web Developer in 2024', platform: 'Udemy', rating: 4.8, url: 'https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/', instructor: 'Andrei Neagoie', price: '$19.99', students: '750,000+' },
    { title: 'Web Design for Everybody', platform: 'Coursera', rating: 4.7, url: 'https://www.coursera.org/specializations/web-design', instructor: 'University of Michigan', price: '$49/month', students: '300,000+' }
  ],
  'programming': [
    { title: 'Computer Science Programming with a Purpose', platform: 'Coursera', rating: 4.9, url: 'https://www.coursera.org/learn/cs-programming-java', instructor: 'Princeton University', price: '$49/month', students: '1M+' },
    { title: 'The Complete Programming Course 2024', platform: 'Udemy', rating: 4.8, url: 'https://www.udemy.com/course/complete-programming-course/', instructor: 'Rob Percival', price: '$19.99', students: '500,000+' }
  ]
};

function Courses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const getVideoIdForSearch = (query) => {
    query = query.toLowerCase().trim();
    
    // If it's a predefined tutorial, use that
    if (popularTutorials[query]) {
      return popularTutorials[query];
    }
    
    // For any other search term, construct a programming-related search
    const searchTerms = [
      `${query} programming tutorial`,
      `${query} coding tutorial`,
      `${query} development tutorial`,
      `learn ${query} programming`,
      `${query} for beginners`,
      query
    ];

    // Try each search term in order until we find a match in popularTutorials
    for (const term of searchTerms) {
      // First try exact matches
      const exactMatch = Object.keys(popularTutorials).find(key => 
        term === key
      );
      if (exactMatch) {
        return popularTutorials[exactMatch];
      }
      
      // Then try partial matches
      const partialMatch = Object.keys(popularTutorials).find(key => 
        term.includes(key) || key.includes(term)
      );
      if (partialMatch) {
        return popularTutorials[partialMatch];
      }
    }

    // If no specific match found, use these popular programming channels' videos
    const generalTutorials = [
      'fhWGZxkjqJE', // General Programming Concepts
      'zOjov-2OZ0E', // Programming Fundamentals
      'HIj8wU_rGIU', // Coding Tutorial
      'WPqXP_kLzpo', // Tech Tutorial
      'i_LwzRVP7bg'  // Computer Science
    ];

    // Return a random general tutorial
    return generalTutorials[Math.floor(Math.random() * generalTutorials.length)];
  };

  const getPaidCourses = (query) => {
    query = query.toLowerCase().trim();
    let matchedCourses = [];
    
    // Direct match
    if (paidCourses[query]) {
      matchedCourses = paidCourses[query];
    } else {
      // Try to find partial matches
      const searchTerms = [
        query,
        ...query.split(' '),  // Split compound searches
        query.replace('.', ''), // Try without dots (e.g., "node.js" -> "nodejs")
        query.replace('-', ' ') // Try with hyphens as spaces
      ];

      // Check each search term against categories
      for (const term of searchTerms) {
        for (const category in paidCourses) {
          if (category.includes(term) || term.includes(category)) {
            // Add courses if not already included
            paidCourses[category].forEach(course => {
              if (!matchedCourses.some(c => c.title === course.title)) {
                matchedCourses.push(course);
              }
            });
          }
        }
      }

      // If still no matches, try searching in course titles
      if (matchedCourses.length === 0) {
        Object.values(paidCourses).flat().forEach(course => {
          if (course.title.toLowerCase().includes(query)) {
            matchedCourses.push(course);
          }
        });
      }
    }
    
    // If still no matches found, return programming courses as default
    return matchedCourses.length > 0 ? matchedCourses : paidCourses['programming'];
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      setLoading(true);
      const videoId = getVideoIdForSearch(query);
      const searchTitle = query.charAt(0).toUpperCase() + query.slice(1);
      setCourse({
        title: searchTitle,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`
      });
      setLoading(false);
    } else {
      setCourse(null);
    }
  };

  const handleStartCourse = () => {
    navigate('/learning-path', { 
      state: { 
        courseTitle: course.title,
        videoUrl: course.youtubeUrl 
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 6 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search courses"
          placeholder="Search for a course topic..."
          value={searchQuery}
          onChange={handleSearch}
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
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(13, 19, 23, 0.65)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              '& fieldset': {
                border: 'none'
              },
              '&:hover fieldset': {
                border: 'none'
              },
              '&.Mui-focused fieldset': {
                border: 'none'
              },
              '& input': {
                color: 'white',
                textAlign: 'left',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1
                }
              }
            }
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress sx={{ color: '#4FC3F7' }} />
        </Box>
      ) : course && (
        <>
          <Card sx={{
            bgcolor: 'rgba(13, 19, 23, 0.85)',
            borderRadius: '20px',
            border: '2px solid #4FC3F7',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 25px rgba(79, 195, 247, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 30px rgba(79, 195, 247, 0.4)',
              border: '2px solid #81D4FA',
            },
            mb: 4
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h5" 
                component={Link}
                href={course.youtubeUrl}
                target="_blank"
                sx={{ 
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'block',
                  mb: 2,
                  '&:hover': {
                    color: '#81D4FA',
                    textDecoration: 'none'
                  }
                }}
              >
                {course.title} Tutorial
              </Typography>
              <Button
                startIcon={<PlayArrowIcon />}
                variant="contained"
                onClick={handleStartCourse}
                fullWidth
                sx={{
                  bgcolor: '#4FC3F7',
                  color: '#0A1929',
                  fontWeight: 600,
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  borderRadius: '10px',
                  '&:hover': { 
                    bgcolor: '#81D4FA',
                    transform: 'scale(1.02)',
                    transition: 'all 0.2s ease'
                  },
                }}
              >
                Start Course Now
              </Button>
            </CardContent>
          </Card>

          <Card sx={{
            bgcolor: 'rgba(13, 19, 23, 0.85)',
            borderRadius: '20px',
            border: '2px solid #4FC3F7',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 25px rgba(79, 195, 247, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 30px rgba(79, 195, 247, 0.4)',
              border: '2px solid #81D4FA',
            },
            mb: 4
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ 
                color: 'white', 
                mb: 2, 
                display: 'flex', 
                alignItems: 'center',
                fontWeight: 600
              }}>
                <SchoolIcon sx={{ color: '#4FC3F7', mr: 1.5, fontSize: '1.8rem' }} />
                Premium Courses
              </Typography>
              <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.15)', mb: 3 }} />
              <List sx={{ py: 0 }}>
                {getPaidCourses(searchQuery).map((course, index) => (
                  <ListItem 
                    key={index}
                    component={Link}
                    href={course.url}
                    target="_blank"
                    sx={{ 
                      color: 'white',
                      textDecoration: 'none',
                      py: 2,
                      px: 2,
                      mb: 2,
                      bgcolor: 'rgba(13, 19, 23, 0.4)',
                      borderRadius: '12px',
                      border: '1px solid rgba(79, 195, 247, 0.1)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(79, 195, 247, 0.15)',
                        transform: 'translateX(5px)',
                        border: '1px solid rgba(79, 195, 247, 0.3)'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Avatar 
                        src={course.platform === 'Udemy' 
                          ? 'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg'
                          : 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/coursera-logo-square.png'
                        }
                        alt={course.platform}
                        sx={{ 
                          width: 32, 
                          height: 32,
                          bgcolor: 'white',
                          p: course.platform === 'Udemy' ? 0.8 : 0
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box>
                          <Typography sx={{ 
                            fontWeight: 500,
                            fontSize: '1.1rem',
                            mb: 0.5
                          }}>
                            {course.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            by {course.instructor}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontWeight: 500,
                              mr: 2
                            }}
                          >
                            {course.platform}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <StarIcon sx={{ color: '#FFD700', fontSize: '1rem', mr: 0.5 }} />
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontWeight: 500
                              }}
                            >
                              {course.rating}
                            </Typography>
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#4FC3F7',
                              fontWeight: 600
                            }}
                          >
                            {course.price}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.5)',
                              ml: 2
                            }}
                          >
                            {course.students} students
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
}

export default Courses;