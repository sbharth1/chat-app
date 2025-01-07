import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupFormData, validateEmail, validatePassword } from "../types";
import axios from "axios";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();

  const allValues = {
    userName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
  };

  const [formData, setFormData] = useState<SignupFormData>(allValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!formData.userName) {
      newErrors.userName = "User name is required";
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters long and contain at least one letter and one number";
      isValid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      setFormData(allValues);
      const response = await axios.post(
        "http://localhost:4000/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
        keydownListenerCapture: true,
        timer: 2000,
      });

      if (response.statusText === "OK") {
        setTimeout(() => {
          navigate("/api/login");
        }, 1000);
      }
    } catch (error: any) {
      console.log(error.response?.data || error.message || error);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "There was an issue with your signup. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        keydownListenerCapture: true,
        timer: 2000,
      });
      setErrors({
        general: "There was an issue with your signup. Please try again later.",
      });
    }
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
              Sign Up
            </Typography>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <TextField
                label="UserName"
                variant="outlined"
                fullWidth
                margin="normal"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                error={!!errors.userName}
                helperText={errors.userName}
              />

              <TextField
                label="LastName"
                variant="outlined"
                fullWidth
                margin="normal"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
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
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />

              <TextField
                type="date"
                fullWidth
                margin="normal"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
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

            <br />
            <h6>
              If you already have an account?{" "}
              <Link to={"/api/login"}>Login here</Link>
            </h6>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Signup;
