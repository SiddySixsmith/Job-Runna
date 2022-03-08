import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Container,
  Stack,
  Button,
  Box,
  Divider,
  Alert,
  AlertTitle,
  Dialog,
} from "@mui/material/";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/images/Job-runna-logo.png";
import styles from "../styles/signup.module.css";

const Signup = () => {
  const [errorCode, seterrorCode] = useState(false);
  const [checkAuth, setCheckAuth] = useState(false);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "".toLowerCase(),
    password: "",
  });

  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email.toLowerCase(),
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
      seterrorCode(!errorCode);
    }
  };
  const handleClose = () => {
    seterrorCode(false);
  };
  return (
    <Container className={styles.Container}>
      <Box component="form" noValidate onSubmit={handleFormSubmit}>
        <img className={styles.img} src={logo} alt="Logo" />
        <Stack>
          <div className={styles.inputBox}>
            <label className={styles.label}>First Name</label>
            <br />
            <input
              className={styles.textfield}
              id="firstName"
              name="firstName"
              autoFocus
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputBox}>
            <label className={styles.label}>Last Name</label>
            <br />
            <input
              className={styles.textfield}
              id="lastname"
              name="lastName"
              required
              autoFocus
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputBox}>
            <label className={styles.label}>Email</label>
            <br />
            <input
              className={styles.textfield}
              id="email"
              name="email"
              required
              autoFocus
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputBox}>
            <label className={styles.label}>Password</label>
            <br />
            <input
              className={styles.textfield}
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              onChange={handleChange}
            />
          </div>
          <Dialog open={errorCode} onClick={handleClose}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Oops, something wrong, please check fields are corect and try
              again
            </Alert>
          </Dialog>
          <Button
            variant="contained"
            type="submit"
            id="signupSubmit"
            className={styles.submitBtn}
          >
            Signup
          </Button>
          <Divider />
          <LinkContainer to={"/"}>
            <Button
              variant="contained"
              type="submit"
              id="signupSubmit"
              className={styles.submitBtn}
            >
              Remember your Login?
            </Button>
          </LinkContainer>
        </Stack>
      </Box>
    </Container>
  );
};

export default Signup;
