import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { UPDATE_JOB } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import DatePicker from "../dataPicker";
import moment from "moment";
import styles from "../../styles/form.module.css";

const UpdateJobForm = (props) => {
  const { job } = props;

  const handleStartDate = (startDateValue) => {
    startDateValue = moment(startDateValue).format("DD/MM/yyyy");
    setFormState({ ...formState, startDate: startDateValue });
  };
  const handleEndDate = (endDateValue) => {
    endDateValue = moment(endDateValue).format("DD/MM/yyyy");
    setFormState({ ...formState, endDate: endDateValue });
  };
  const [formState, setFormState] = useState({
    siteAddress: job.siteAddress,
    jobDescription: job.jobDescription,
    builderName: job.builderName,
    contact: job.contact,
    contactNumber: job.contactNumber,
    startDate: job.startDate,
    endDate: job.endDate,
    meterage: job.meterage,
  });
  const [updateJob, { error }] = useMutation(UPDATE_JOB);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateJob({
        variables: {
          siteAddress: formState.siteAddress,
          jobDescription: formState.jobDescription,
          builderName: formState.builderName,
          contact: formState.contact,
          contactNumber: formState.contactNumber,
          startDate: formState.startDate,
          endDate: formState.endDate,
          meterage: formState.meterage,
        },
      });
      setOpen(false);
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
  const { open, setOpen } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" className={styles.header}>
        {"Update job item"}
      </DialogTitle>
      <Box component="form" noValidate onSubmit={handleFormSubmit}>
        <DialogContent className={styles.content}>
          <TextField
            variant="standard"
            className={styles.content}
            placeholder={formState.siteAddress}
            id="siteAddress"
            label="Site Address"
            name="siteAddress"
            autoFocus
            onChange={handleChange}
          />

          <TextField
            variant="standard"
            className={styles.content}
            placeholder={formState.jobDescription}
            id="jobDescription"
            label="Job Description"
            name="jobDescription"
            autoFocus
            onChange={handleChange}
          />

          <TextField
            variant="standard"
            className={styles.content}
            placeholder={formState.builderName}
            id="builderName"
            label="Builder"
            name="builderName"
            autoFocus
            onChange={handleChange}
          />

          <TextField
            variant="standard"
            className={styles.content}
            placeholder={formState.contact}
            id="contact"
            label="Contact"
            name="contact"
            autoFocus
            onChange={handleChange}
          />

          <TextField
            variant="standard"
            className={styles.content}
            placeholder={formState.contactNumber}
            id="contactNumber"
            label="Contact Number"
            name="contactNumber"
            autoFocus
            onChange={handleChange}
          />

          <DatePicker onValue={handleStartDate} label={"Start Date"} />

          <DatePicker onValue={handleEndDate} label={"End Date"} />

          <TextField
            variant="standard"
            className={styles.content}
            placeholder={formState.meterage}
            id="meterage"
            label="Meterage"
            name="meterage"
            autoFocus
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className={styles.submitBtn}>
            Cancel
          </Button>
          <Button type="submit" autoFocus className={styles.submitBtn}>
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UpdateJobForm;
