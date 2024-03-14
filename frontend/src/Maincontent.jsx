import React, { useState } from 'react';
import { TextField, Button, Grid, createTheme, ThemeProvider, Typography, Box, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MainContentSection = () => {
  const [longUrl, setLongUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); 

  const handleShortenUrl = () => {
    const shortenedUrl = generateShortenedUrl(longUrl, alias);
    setShortenedUrl(shortenedUrl);
  };

  const generateRandomAlias = () => {
    const length = 6;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
  };

  const generateShortenedUrl = (longUrl, alias) => {
    let shortenedUrl = "https://mlsctiet.com/";
    if (alias.trim() !== '') {
      shortenedUrl += alias;
    } else {
      shortenedUrl += generateRandomAlias();
    }
    return shortenedUrl;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl)
      .then(() => {
        console.log('URL copied to clipboard');
        setSnackbarOpen(true); 
      })
      .catch((error) => {
        console.error('Failed to copy URL to clipboard:', error);
      });
  };

  return (
    <Grid container spacing={2} alignItems="center" sx={{backgroundColor: '#eaeff1', padding: 5, borderRadius: 10}}>
      <Typography variant='h4'>Shorten Your link</Typography>

      <Grid item xs={12}>
        <TextField
          label="Enter your long URL"
          variant="outlined"
          fullWidth
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Enter custom alias (optional)"
          variant="outlined"
          fullWidth
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShortenUrl}
        >
          Shorten URL
        </Button>
      </Grid>
      {shortenedUrl && (
        <Grid item xs={12}>
          <Typography variant='body6'>Shortened URL: {shortenedUrl}</Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={copyToClipboard}
            sx={{ marginLeft: 2 }}
          >
            <ContentCopyIcon/>
          </Button>
        </Grid>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} 
        onClose={() => setSnackbarOpen(false)} 
        message="Successfully copied Link" 
      />
    </Grid>
  );
};

export default MainContentSection;
