import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { QUERY_JOB } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import styles from "../../styles/listItems.module.css";
import ResponsiveDialogJob from "../jobForm";

const JobListHome = () => {
  const [open, setOpen] = useState(false);

  const { loading, data } = useQuery(QUERY_JOB);
  const jobs = data?.Job || [];
  if (!jobs.length) {
    return (
      <Container>
        <Typography variant="h5" className={styles.noStock}>
          No Jobs avaliable
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          className={styles.newItemBtn}
        >
          Add New Job
        </Button>
        <ResponsiveDialogJob
          open={open}
          setOpen={setOpen}
        ></ResponsiveDialogJob>
      </Container>
    );
  }
  return (
    <Container>
      <List
        className={styles.listContainer}
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {jobs
          .filter((_, index) => index < -3)
          .map((job) => (
            <Link
              key={job._id}
              to={`/jobs/${job._id}`}
              className={styles.links}
            >
              <ListItem className={styles.item}>
                <ListItemAvatar></ListItemAvatar>
                <ListItemText
                  primary={job.siteAddress}
                  secondary={job.builderName}
                />
              </ListItem>
            </Link>
          ))}
      </List>
    </Container>
  );
};

export default JobListHome;
