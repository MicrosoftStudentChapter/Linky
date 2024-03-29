import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  createTheme,
  ThemeProvider,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LaunchIcon from "@mui/icons-material/Launch";
import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const MainContentSection = () => {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  var dt = new Date();
  const [expiry, setExpiry] = useState(dayjs().add(1, "week"));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState("");
  const handleShortenUrl = async () => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(longUrl)) {
      setError("Invalid URL");
      return;
    }
    setError("");

    const shortenedUrl = generateShortenedUrl(alias);

    const link = "https://l.mlsctiet.com"

    // api call to add link in the backend
    const raw = JSON.stringify({
      Link: longUrl,
      ShortURL: shortenedUrl,
      Expiry: expiry.toISOString(),
    });
    const config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${link}/add-link`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
          "https://generate.mlsctiet.com, http://localhost:5173",
      },
      data: raw,
    };
    const response = await axios.request(config);
    // show the response from the backend with this
    if (response.status == 200) {
      console.log(raw);
      setShortenedUrl(`${link}/` + shortenedUrl);
    } else {
      setShortenedUrl("Error in shortening the URL");
    }
  };

  const generateRandomAlias = () => {
    const length = 6;
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  };

  const generateShortenedUrl = (alias) => {
    if (alias.trim() !== "") {
      return alias;
    } else {
      return generateRandomAlias();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shortenedUrl)
      .then(() => {
        console.log("URL copied to clipboard");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Failed to copy URL to clipboard:", error);
      });
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ backgroundColor: "#eaeff1", padding: 5, borderRadius: 10 }}
    >
      <Typography variant="h4">Shorten Your link</Typography>

      <Grid item xs={12}>
        <TextField
          label="Enter your long URL"
          variant="outlined"
          fullWidth
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          error={!!error}
          helperText={error}
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Set Expiry Date (1 week default)"
            value={expiry}
            fullWidth
            onChange={(newVal) => {
              setExpiry(newVal);
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleShortenUrl}>
          Shorten URL
        </Button>
      </Grid>
      {shortenedUrl && (
        <Grid item xs={12}>
          Shortened URL:{" "}
          <a href={shortenedUrl} target="blank">
            {shortenedUrl}
          </a>
          <Button
            variant="contained"
            href={shortenedUrl}
            target="blank"
            sx={{ ml: 2 }}
          >
            <LaunchIcon />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={copyToClipboard}
            sx={{ marginLeft: 2 }}
          >
            <ContentCopyIcon />
          </Button>
        </Grid>
      )}
      {/* Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Hide after 3 seconds
        onClose={() => setSnackbarOpen(false)} // Close Snackbar
        message="Successfully copied Link" // Snackbar message
      />
    </Grid>
  );
};

export default MainContentSection;
