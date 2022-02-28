import * as React from "react";
import { useState } from "react";
import { Container, TextField, Stack, Button, Box } from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import logo from "../assets/images/Job-runna-logo.png";
import styles from "../styles/login.module.css";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
        <Stack className={styles.Stack}>
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
