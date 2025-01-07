import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { ToastContainer } from "react-toastify"

const ForgetPassword = () => {

    const [forgetPasswordEmail,SetForgetPasswordEmail]  = useState<string | undefined>();
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        SetForgetPasswordEmail(e.target.value)
    }

  return (
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
          Find your mail
        </Typography>

        <form  style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
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
  )
}

export default ForgetPassword