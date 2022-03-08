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
import UpdateJobForm from "../updateJobForm";

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
  const handleClickOpenUpdate = () => {
    setOpen(true);
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
                <Typography variant="h5" color="text.secondary">
                  Builder
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  className={styles.typgraphy}
                >
                  {job.builderName}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  Contact
                </Typography>
                <Typography variant="h6" className={styles.typgraphy}>
                  {job.contact}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  Contact Number
                </Typography>
                <Typography variant="h6" className={styles.typgraphy}>
                  {job.contactNumber}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  Meterage
                </Typography>
                <Typography variant="h6" className={styles.typgraphy}>
                  {job.meterage}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="h6" className={styles.typgraphy}>
                  {job.startDate}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  End Date
                </Typography>
                <Typography variant="h6" className={styles.typgraphy}>
                  {job.endDate}
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
            <UpdateJobForm
              open={open}
              setOpen={setOpen}
              onClick={handleClickOpenUpdate}
              job={job}
            ></UpdateJobForm>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SingleJob;
