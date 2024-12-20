import  React, { FormEvent, useState } from 'react';
import { Link } from "react-router-dom"
import { LoginFormData } from '../types';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

const Login = () => {
   

  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   setLoginData({
    email:"",
    password:"",
   })
    alert('Sign up successful!');
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  return (<>
  <Box  sx={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',     
        minHeight: '100vh',      
        backgroundColor: '#f4f4f9'
      }}>
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
         alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>          
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
          
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    <Link to={"/signup"}>Signup page</Link> 
    </Container>
    </Box>
    </>
  );
};

export default Login;





