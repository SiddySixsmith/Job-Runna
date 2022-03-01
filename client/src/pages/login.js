import * as React from "react";
import { useState } from "react";
import {
  Container,
  Stack,
  Button,
  Box,
  Alert,
  AlertTitle,
  Dialog,
} from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import logo from "../assets/images/Job-runna-logo.png";
import styles from "../styles/login.module.css";

function Login() {
  const [errorCode, seterrorCode] = useState(false);

  const [formState, setFormState] = useState({
    email: "".toLowerCase(),
    password: "",
  });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: formState.email.toLowerCase(),
          password: formState.password,
        },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
      seterrorCode(!errorCode);
    }
  };

  const handleClose = () => {
    seterrorCode(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container className={styles.Container}>
      <Box component="form" onSubmit={handleFormSubmit} noValidate>
        <img className={styles.img} src={logo} alt="Logo" />
        <br />
        <br />
        <br />
        <br />
        <Stack>
          <div>
            <label label="Email" className={styles.label}>
              Email:
            </label>
            <br />
            <input
              className={styles.textfield}
              id="loginEmail"
              name="email"
              onChange={handleChange}
            />
            <br />
            <br />
            <br />
            <br />
            <label label="Password" className={styles.label}>
              Passwords:
            </label>
            <br />
            <input
              className={styles.textfield}
              id="loginPassword"
              label="Password"
              variant="standard"
              name="password"
              type={"password"}
              onChange={handleChange}
            />
            <br />
            <br />
            <br />
          </div>
          <Dialog open={errorCode} onClick={handleClose}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Email or Password is incorrect
            </Alert>
          </Dialog>
          <Button
            variant="contained"
            type="submit"
            className={styles.submitBtn}
          >
            Login
          </Button>
          <br />
          <br />
          <LinkContainer to="/signup">
            <Button variant="contained" className={styles.submitBtn}>
              Dont Have an Account Sign Up!
            </Button>
          </LinkContainer>
        </Stack>
      </Box>
    </Container>
  );
}

export default Login;
