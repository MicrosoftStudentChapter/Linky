import React, { useState } from 'react';
import { TextField, Button, Grid, createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MainContentSection = () => {
  const [longUrl, setLongUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

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

  return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="Enter your long URL"
            variant="outlined"
            fullWidth
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
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
            Shortened URL: {shortenedUrl}
          </Grid>
        )}
      </Grid>
  );
};

export default MainContentSection;
