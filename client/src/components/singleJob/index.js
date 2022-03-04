import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_JOB_BY_ID } from "../../utils/queries";
import styles from "../../styles/stock.module.css";
import { DELETE_JOB } from "../../utils/mutations";
import { LinkContainer } from "react-router-bootstrap";
import ResponsiveDialogJob from "../jobForm";

const SingleJob = () => {
  const { _id } = useParams();
  const [open, setOpen] = useState(false);

  const { loading, data: queryData } = useQuery(QUERY_JOB_BY_ID, {
    variables: { id: _id },
  });
  const job = queryData?.getJobById || [];

  const [deleteJob, { error }] = useMutation(DELETE_JOB);

  const handleDeleteJob = async (id) => {
    try {
      const { data } = await deleteJob({
        variables: { id },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={styles.Container}>
      <h1 className={styles.Header}> {job.siteAddress}</h1>
      {loading ? (
        <div>loading...... </div>
      ) : (
        <>
          <Box>
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
                <Typography variant="body1" className={styles.typgraphy}>
                  Conact Number: <br />
                  {job.contactNumber}
                  <br />
                </Typography>
                <Typography variant="body1" className={styles.typgraphy}>
                  Meterage:
                  <br /> {job.meterage}
                  <br />
                </Typography>
                <Typography variant="body1" className={styles.typgraphy}>
                  Start Date:
                  <br /> {job.startDate}
                  <br />
                </Typography>
                <Typography variant="body1" className={styles.typgraphy}>
                  Start Date: <br />
                  {job.startDate}
                </Typography>
              </CardContent>
            </Card>
            <LinkContainer to={"/jobs"}>
              <Button
                onClick={() => handleDeleteJob(job._id)}
                variant="contained"
                className={styles.submitBtn}
              >
                Delete
              </Button>
            </LinkContainer>
            <br />
            <br />
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              className={styles.submitBtn}
            >
              update
            </Button>
            <ResponsiveDialogJob
              open={open}
              setOpen={setOpen}
            ></ResponsiveDialogJob>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SingleJob;
