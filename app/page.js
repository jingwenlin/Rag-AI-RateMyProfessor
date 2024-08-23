'use client'
import { Box, Button, Stack, TextField, Paper, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim() === '') return;
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  const formatContent = (content) => {
    return content
      .replace(/\n+/g, '\n') // Replace multiple line breaks with a single one
      .replace(/(\d\.\s)/g, '\n$1') // Add new lines before each numbered item, but with less spacing
      .replace(/ - /g, ' - ') // Ensure that the dash is on the same line without excessive line breaks
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Gradient background for a modern look
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
      }}
    >
      <AppBar position="static" sx={{ bgcolor: 'primary.dark', mb: 2 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <ChatIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rate My Professor Assistant
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper
        elevation={10}
        sx={{
          width: { xs: '90%', sm: '500px' },
          height: '700px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: 3,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  bgcolor: message.role === 'assistant' ? '#29b6f6' : '#ff7043',
                  color: 'white',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  maxWidth: '80%',
                  boxShadow: 3,
                  transform: 'scale(1)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="body1" whiteSpace="pre-line">
                  {formatContent(message.content)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.3)' }}>
          <TextField
            label="Type your message..."
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000000',
              },
              '& .MuiInputLabel-root': {
                color: '#ffffff',
              },
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={sendMessage}
            sx={{ borderRadius: '50px', minWidth: '60px', height: '60px' }}
          >
            <SendIcon />
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ py: 2, mt: 2, textAlign: 'center', bgcolor: 'primary.dark', width: '100%' }}>
        <Typography variant="caption" color="inherit">
          © 2024 Rate My Professor Assistant. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
