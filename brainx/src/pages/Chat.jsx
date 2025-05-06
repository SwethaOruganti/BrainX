import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

const MotionPaper = motion(Paper);

// API URL for the backend server
const API_URL = 'http://localhost:5000';

const mockMessages = [
  {
    id: 1,
    text: "Hello! I'm your AI learning assistant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

function Chat() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      console.log(`Sending request to ${API_URL}/chatbot`);
      const response = await fetch(`${API_URL}/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      
      const aiResponse = {
        id: messages.length + 2,
        text: data.reply,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get a response. Please try again.');
      
      // Add error message to chat
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        AI Learning Assistant
      </Typography>

      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
        }}
      >
        {/* Messages Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <List>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                    }}
                  >
                    {message.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                  </Avatar>
                </ListItemAvatar>
                <Box
                  sx={{
                    maxWidth: '70%',
                    ml: message.sender === 'user' ? 0 : 2,
                    mr: message.sender === 'user' ? 2 : 0,
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: message.sender === 'user' ? 'primary.main' : 'background.default',
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                      border: message.sender === 'ai' ? '2px solid #4FC3F7' : 'none',
                      borderRadius: '12px',
                      boxShadow: message.sender === 'ai' ? '0 0 10px rgba(79, 195, 247, 0.2)' : 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': message.sender === 'ai' ? {
                        borderColor: '#81D4FA',
                        boxShadow: '0 0 15px rgba(79, 195, 247, 0.3)'
                      } : {}
                    }}
                  >
                    <Typography variant="body1">{message.text}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: message.sender === 'user' ? 'right' : 'left',
                        mt: 1,
                        opacity: 0.7,
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Paper>
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>

        <Divider />

        {/* Input Area */}
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={4}
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.default',
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={input.trim() === '' || isLoading}
              sx={{
                alignSelf: 'flex-end',
                mb: 1,
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </Box>
        </Box>
      </MotionPaper>
    </Container>
  );
}

export default Chat; 