import { FormEvent, useState } from 'react';
import { Link } from "react-router-dom";
import { SignupFormData } from '../types';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { signValidateSchema } from '../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const allValues = {
    userName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: ""
  };
  const [formData, setFormData] = useState<SignupFormData>(allValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
       setFormData((prev)=> (
        {...prev, [name]:value})
      )

  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = signValidateSchema.validate(formData, { abortEarly: false });
    if (error) {
       toast.error("All feilds are required");
       console.log(error.details[0].message);
      return;
    }
    try {
       await axios.post("http://localhost:4000/api/signup", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error + "---response error");
    }
    setFormData(allValues);
  };

  return (<>
    <Box  sx={{
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center',     
      minHeight: '100vh',      
      backgroundColor: '#f4f4f9'
    }}>
      <ToastContainer />
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
  <Link to={"/api/login"}>Login page</Link> 
  </Container>
  </Box> 
  </>
  )
}

export default Signup;
  