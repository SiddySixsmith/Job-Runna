import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Container,
  Stack,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material/";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/images/Job-runna-logo.png";
import styles from "../styles/login.module.css";

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };
  // const HandleSubmitBtn = () => {
  //   if (data) {
  //     return <Alert severity="success">Signup Successful</Alert>;
  //   }
  //   if (error) {
  //     return (
  //       <Alert severity="error">
  //         There was a problem signing you up. Please check you info {error}
  //       </Alert>
  //     );
  //   }
  //   return null;
  // };

  return (
    <Container className={styles.Container}>
      <Box component="form" noValidate onSubmit={handleFormSubmit}>
        <img className={styles.img} src={logo} alt="Logo" />
        <Stack spacing={3} className={styles.Stack}>
          <div>
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
            <br />
            <br />
            <br />

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
            <br />
            <br />
            <br />

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
            <br />
            <br />
            <br />

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
