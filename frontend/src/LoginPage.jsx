import { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Validate email and password
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    // Perform login logic
    // Assuming API call or further validation

    // Clear error state after successful login
    setError("");
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#eaeff1", padding: { xs: 3.8, md: 5 }, borderRadius: 10 }}
    >
      <Typography variant="h4" align="center">Login using Username</Typography>

      <Grid item xs={12} sx={{ pt: { xs: 32, md: 16 }, pl: 16 }}>
        <TextField
          label="Enter your email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={!!error}
          helperText={error}
        />
      </Grid>

      <Grid item xs={12} sx={{ pt: { xs: 32, md: 16 }, pl: 16 }}>
        <TextField
          label="Enter your password"
          variant="outlined"
          fullWidth
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
      <Button
        type="submit"
        fullWidth
        spacing={2}
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
