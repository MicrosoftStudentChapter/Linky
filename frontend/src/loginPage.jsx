import { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const LoginPage = () => {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/login',
      params: {
        username: Username,
        password: password,
      },
      withCredentials: true
    };
  
    try {
      const response = await axios.request(config);
  
      if (response.status === 200) {
        console.log('Login success');
        const redirectUrl = response.data.redirectUrl;
        if (redirectUrl) {
          console.log('redirect');
          window.location.href = redirectUrl;
        } else {
          console.log('No redirect URL provided by the backend');
        }
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      console.error('Full error:', error);
    }
  };

  return (
    <Container
      maxWidth="md" 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '89vh',
        width: {
          xs: '100%',
          md: '50vw',
        }
      }}
    >
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#eaeff1", padding: { xs: 3.8, md: 5 }, borderRadius: 10 }}
    >
      <Typography variant="h4" align="center">Login</Typography>

      <Grid item xs={12} sx={{ pt: { xs: 32, md: 16 }, pl: 16 }}>
        <TextField
          label="Enter your Username"
          variant="outlined"
          fullWidth
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
          // error={!!error}
          // helperText={error}
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
    </Container>
  );
};

export default LoginPage;