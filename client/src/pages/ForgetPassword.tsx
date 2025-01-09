import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForgetPassword = () => {
  const navigate = useNavigate()
  const [forgetPasswordEmail, SetForgetPasswordEmail] = useState<
    string | undefined
  >();
  const [errors,setErrors] = useState<string | undefined>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetForgetPasswordEmail(e.target.value);
  };

  const ForgetPasswordHandle =async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setErrors("");
    if(!forgetPasswordEmail?.includes('@')){
      setErrors("Inavalide Email"); 
    }
    try{
       const response = await axios.post("http://localhost:4000/api/forgot-password",{forgetPasswordEmail},{
          headers: {
            "Content-Type": "application/json",
          },
       })
       Swal.fire({
               title: "Success!",
               text: "Your Reset Password Request Send check your inbox.",
               icon: "success",
               confirmButtonText: "OK",
               keydownListenerCapture: true,
               timer:3000
             });
             if (response.statusText === "OK") {
                     SetForgetPasswordEmail("")
                     navigate('/api/login')
            } 
       console.log(response)
    }catch(error:any){
      console.log(error,'--error from forgotten password')
       Swal.fire({
              title: "Error!",
              text:
                error.response?.data?.message ||
                "There was an issue with your email. Please try again later.",
              icon: "error",
              confirmButtonText: "OK",
              keydownListenerCapture: true,
              timer:2000
            });
    }
  

  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f9",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Find your mail
          </Typography>

          <form style={{ width: "100%" }} onSubmit={ForgetPasswordHandle}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              error={!!errors}
              helperText={errors}
              value={forgetPasswordEmail}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Find
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgetPassword;
