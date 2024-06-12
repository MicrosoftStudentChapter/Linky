// /*
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
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
  const [expiry, setExpiry] = useState(dayjs().add(1, "week"));
  const [expiryOption, setExpiryOption] = useState("1 week");
  const [noExpiry, setNoExpiry] = useState(false);
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
      Expiry: noExpiry ? null : expiry.toISOString(),
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

  const handleExpiryOptionChange = (event) => {
    setExpiryOption(event.target.value);
    switch (event.target.value) {
      case "1 week":
        setExpiry(dayjs().add(1, "week"));
        break;
      case "2 weeks":
        setExpiry(dayjs().add(2, "week"));
        break;
      case "1 month":
        setExpiry(dayjs().add(1, "month"));
        break;
      case "1 year":
        setExpiry(dayjs().add(1, "year"));
        break;
      default:
        break;
    }
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#eaeff1", padding: { xs: 3.8, md: 5 }, borderRadius: 10}}
    >
      <Typography variant="h4" align="center">Shorten Your link</Typography>

      <Grid item xs={12} sx={{ pt: { xs: 32, md: 16 }, pl: 16 }}>
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
      <Grid item xs={12} sx={{ pt: { xs: 32, md: 16 }, pl: 16 }}>
        <TextField
          label="Enter custom alias (optional)"
          variant="outlined"
          fullWidth
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sx={{ pt: { xs: 32, md: 16 }, pl: 16 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="DD/MM/YYYY"
            label="Set Expiry Date"
            value={expiry}
            fullWidth
            minDate={dayjs().startOf('day')}
            disabled={(noExpiry)}
            onChange={(newVal) => {setExpiry(newVal)}}
          />
         
        </LocalizationProvider>
       
      </Grid>
   

      <Grid item xs={12} sm={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="expiry-option-label">Expiry Option</InputLabel>
          <Select
            labelId="expiry-option-label"
            id="expiry-option-select"
            value={expiryOption}
            onChange={handleExpiryOptionChange}
            label="Expiry Option"
            size="medium" 
            disabled={noExpiry}
            
            // fullWidth
          >
            <MenuItem value="1 week">1 week (until {dayjs().add(1, "week").format("DD/MM/YYYY")})</MenuItem>
            <MenuItem value="2 weeks">2 weeks (until {dayjs().add(2, "week").format("DD/MM/YYYY")})</MenuItem>
            <MenuItem value="1 month">1 month (until {dayjs().add(1, "month").format("DD/MM/YYYY")})</MenuItem>
            <MenuItem value="1 year">1 year (until {dayjs().add(1, "year").format("DD/MM/YYYY")})</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setNoExpiry(!noExpiry)}
        >
          {noExpiry ? "Clear No Expiry" : "No Expiry"}
        </Button>
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
// */
