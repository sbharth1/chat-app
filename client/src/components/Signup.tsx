import  React, { FormEvent, useState } from 'react';
import { Link } from "react-router-dom"
import { SignupFormData } from '../types'
import axios from 'axios'
import { TextField, Button, Container, Box, Typography } from '@mui/material';

const Signup = () => {

  const [formData, setFormData] = useState<SignupFormData>({
    userName:"",
    lastName:"",
    email: "",
    password: "",
    dateOfBirth:""
  });

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
   
   const response =  await axios.post("http://localhost:4000/api/signup",formData,{
    headers: {
      'Content-Type': 'application/json',
    },
    
   })
   console.log(response);
  }catch(error){
    console.log(error + "---response error")
  }
   setFormData({
    userName:"",
    lastName:"",
    email: "",
    password: "",
    dateOfBirth:""
   })
    alert('Sign up successful!');
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
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
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}> 
        <TextField
            label="UserName"
            variant="outlined"
            fullWidth
            margin="normal"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />         

         <TextField
            label="LastName"
            variant="outlined"
            fullWidth
            margin="normal"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
            <TextField
            type='date'
            fullWidth
            margin="normal"
            name="dateOfBirth"
            value={formData.dateOfBirth}
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
    <Link to={"/"}>signup page</Link> 
    </Container>
    </Box>
    </>
  );
};

export default Signup;





