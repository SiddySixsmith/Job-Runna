import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import ResponsiveDialogJob from "../jobForm";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_JOB } from "../../utils/queries";
import styles from "../../styles/stock.module.css";
import { LinkContainer } from "react-router-bootstrap";

const JobList = () => {
  const [open, setOpen] = useState(false);

  const { loading, data } = useQuery(QUERY_JOB);
  const jobs = data?.Job || [];

  if (!jobs.length) {
    <Container>
      <Typography variant="h3">No Jobs avaliable</Typography>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        className={styles.newItemBtn}
      >
        Add New Job
      </Button>
      <ResponsiveDialogJob open={open} setOpen={setOpen}></ResponsiveDialogJob>
    </Container>;
  }
  return (
    <Container className={styles.Container}>
      <h1 className={styles.Header}> Job List</h1>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        className={styles.newItemBtn}
      >
        Add New Job
      </Button>
      <ResponsiveDialogJob open={open} setOpen={setOpen}></ResponsiveDialogJob>
      {jobs.map((job) => (
        <LinkContainer key={job._id} to={`/jobs/${job._id}`}>
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
              </Typography>
            </CardContent>
          </Card>
        </LinkContainer>
      ))}
    </Container>
  );
};

export default JobList;
