// import  React, { FormEvent, useState } from 'react';
// import { Link } from "react-router-dom"
// import { LoginFormData } from '../types';
// import axios from 'axios'
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import { loginValidateSchema } from '../types';
// import { TextField, Button, Container, Box, Typography } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
   
//   const allValue =  {
//     email: '',
//     password: '',
//   };

//   const [loginData, setLoginData] = useState<LoginFormData>(allValue);
// const navigate = useNavigate();
//   const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const { error } = loginValidateSchema.validate(loginData, { abortEarly: false });
//     if (error) {
//       console.log(toast.error("All fields are required"));
//       // console.log(error);
//       return;
//     }
//     try{
   
//    const response =  await axios.post("http://localhost:4000/api/login",loginData,{
//     headers: {
//       'Content-Type': 'application/json',
//     },
//    })
//   //  console.log(response) 
//    const token = response.data.token;
//    Cookies.set(
//     "token",
//     token,
//     { expires: 7, secure: true, sameSite: 'Strict' }
//    )
//     if(response.statusText === "OK"){
//    navigate('/api/dashboard')
//     }else{
//       console.log('error in login api')
//     }
//   }catch(error){
//     console.log(error + "---response error")
//   }
//    setLoginData(allValue)
//     alert('Login up successful!');
//   };

//   const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setLoginData((prev)=> (
//       {...prev, [name]:value}
//     ))

//   };

//   return (<>
//   <Box  sx={{
//         display: 'flex',
//         justifyContent: 'center', 
//         alignItems: 'center',     
//         minHeight: '100vh',      
//         backgroundColor: '#f4f4f9'
//       }}>
//         <ToastContainer/>
//      <Container maxWidth="xs">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//          alignItems: 'center',
//           padding: 3,
//           borderRadius: 2,
//           boxShadow: 3,
//           backgroundColor: '#fff'
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Login
//         </Typography>

//         <form onSubmit={handleSubmit} style={{ width: '100%' }}>          
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             name="email"
//             value={loginData.email}
//             onChange={handleChange}
//           />
          
//           <TextField
//             label="Password"
//             variant="outlined"
//             type="password"
//             fullWidth
//             margin="normal"
//             name="password"
//             value={loginData.password}
//             onChange={handleChange}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Sign Up
//           </Button>
//         </form>
//       </Box>
//       <Button
//       variant="contained"
//       color="primary"
//       sx={{
//         padding: '2px 10px',
//         fontSize: '1rem',
//         textTransform: 'none',
//         boxShadow: 2,
//         '&:hover': {
//           boxShadow: 4,
//         },
//       }}
//     >
//       <Link to={"/api/signup"}>Create a Account</Link>
//     </Button> 
//     </Container>
//     </Box>
//     </>
//   );
// };

// export default Login;






import React, { FormEvent, useState } from 'react';
import { Link } from "react-router-dom";
import { LoginFormData } from '../types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { loginValidateSchema } from '../types';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const initialValue = {
    email: '',
    password: '',
  };

  const [loginData, setLoginData] = useState<LoginFormData>(initialValue);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = loginValidateSchema.validate(loginData, { abortEarly: false });
    if (error) {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/login", loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7, secure: true, sameSite: 'Strict' });
      if (response.statusText === "OK") {
        navigate('/api/dashboard');
      } else {
        console.log('Error in login API');
      }
    } catch (error) {
      console.log(error + "---response error");
    }
    setLoginData(initialValue);
    toast.success('Login successful!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f4f4f9',
        }}
      >
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
              backgroundColor: '#fff',
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
                Login
              </Button>
            </form>

            {/* Button Set */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mr: 1 }}
                component={Link}
                to="/api/signup"
              >
                Create an Account
              </Button>

              <Button
                variant="outlined"
                color="info"
                fullWidth
                sx={{ ml: 1 }}
                component={Link}
                to="/api/forgot-password"
              >
                Forgot Password?
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
