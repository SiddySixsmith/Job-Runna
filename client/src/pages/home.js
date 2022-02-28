import React from "react";
import Auth from "../utils/auth";
import JobListHome from "../components/jobListHome";
import StockListHome from "../components/stockListHome";
import { Container } from "@mui/material";
import styles from "../styles/home.module.css";

const Home = () => {
  const { data: user } = Auth.getUser();

  return (
    <Container className={styles.Container}>
      <h1 className={styles.Header}>Welcome, {user.firstName} </h1>
      <div>
        <JobListHome />
      </div>
      <div>
        <StockListHome />
      </div>
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

export default Home;
