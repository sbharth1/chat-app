import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { LoginFormData, validateEmail, validatePassword } from "../types";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Login = () => {
  const initialValue = {
    email: "",
    password: "",
  };
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginFormData>(initialValue);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!validateEmail(loginData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!validatePassword(loginData.password)) {
      newErrors.password =
        "Password must be at least 6 characters long and contain at least one letter and one number";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true)
      const response = await axios.post(
        "http://localhost:4000/api/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoginData(initialValue);
      Swal.fire({
        title: "Success!",
        text: "Your account login successfully.",
        icon: "success",
        confirmButtonText: "OK",
        keydownListenerCapture: true,
        timer:2000
      });

      const token = response.data.token;
      Cookies.set("token", token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      if (response.statusText === "OK") {
        navigate("/api/dashboard");
      } else {
        console.log("Error in login API");
      }
    } catch (error: any) {
      console.log(error + "---response error");
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "There was an issue with your signup. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        keydownListenerCapture: true,
      });
    }
    setIsLoading(false)

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
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
              Login
            </Typography>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                name="password"
                value={loginData.password}
                error={!!errors.password}
                helperText={errors.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                {isLoading ? "Login..." : "Login"}
              </Button>
            </form>

            {/* Button Set */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
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
