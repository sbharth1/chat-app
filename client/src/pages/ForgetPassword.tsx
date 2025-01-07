import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const ForgetPassword = () => {
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
       console.log(response)
    }catch(error){
      console.log(error,'--error from forgotten password')
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
