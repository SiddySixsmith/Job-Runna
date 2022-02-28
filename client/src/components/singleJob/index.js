import React from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_JOB_BY_ID } from "../../utils/queries";
import styles from "../../styles/stock.module.css";

const SingleJob = () => {
  const { _id } = useParams();

  const { loading, data } = useQuery(QUERY_JOB_BY_ID, {
    variables: { id: _id },
  });
  const job = data?.getJobById || [];

  return (
    <Container className={styles.Container}>
      <h1 className={styles.Header}> {job.siteAddress}</h1>
      {loading ? (
        <div>loading...... </div>
      ) : (
        <Card className={styles.card}>
          <CardContent>
            <Typography
              sx={{ fontSize: 20 }}
              className={styles.title}
              color="text.secondary"
            >
              {job.siteAddress}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {job.builderName}
            </Typography>
            <Typography variant="body1">
              Conact Number: <br />
              {job.contactNumber}
              <br />
              Meterage: {job.meterage}
              <br />
              Start Date: {job.startDate}
              <br />
              Start Date: {job.startDate}
              <br />
              Start Date: {job.startDate}
              <br />
              Start Date: {job.startDate}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default SingleJob;
