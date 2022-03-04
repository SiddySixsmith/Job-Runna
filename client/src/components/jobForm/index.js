import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ADD_JOB } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import DatePicker from "../dataPicker";
import moment from "moment";
import styles from "../../styles/form.module.css";

const ResponsiveDialogJob = (props) => {
  const handleStartDate = (startDateValue) => {
    startDateValue = moment(startDateValue).format("DD/MM/yyyy");
    setFormState({ ...formState, startDate: startDateValue });
  };
  const handleEndDate = (endDateValue) => {
    endDateValue = moment(endDateValue).format("DD/MM/yyyy");
    setFormState({ ...formState, endDate: endDateValue });
  };

  const [formState, setFormState] = useState({
    siteAddress: "",
    jobDescription: "",
    builderName: "",
    contact: "",
    contactNumber: "",
    startDate: "",
    endDate: "",
    meterage: "",
  });
  const [addJob, { error }] = useMutation(ADD_JOB);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addJob({
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
      console.log(data);
      setOpen(false);

      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event);
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
        {"Add a new job item"}
      </DialogTitle>
      <Box component="form" noValidate onSubmit={handleFormSubmit}>
        <DialogContent className={styles.content}>
          <TextField
            variant="standard"
            className={styles.content}
            id="siteAddress"
            label="Site Address"
            name="siteAddress"
            autoFocus
            required
            onChange={handleChange}
          />

          <TextField
            variant="standard"
            className={styles.content}
            id="jobDescription"
            label="Job Description"
            name="jobDescription"
            autoFocus
            required
            onChange={handleChange}
          />

          <TextField
            variant="standard"
            className={styles.content}
            id="builderName"
            label="Builders Name"
            name="builderName"
            autoFocus
            required
            onChange={handleChange}
          />

          <TextField
            variant="standard"
            className={styles.content}
            id="contact"
            label="Contact"
            name="contact"
            autoFocus
            required
            onChange={handleChange}
          />

          <TextField
            variant="standard"
            className={styles.content}
            id="contactNumber"
            label="Contact Number"
            name="contactNumber"
            autoFocus
            required
            onChange={handleChange}
          />

          <DatePicker onValue={handleStartDate} />

          <DatePicker onValue={handleEndDate} />

          <TextField
            variant="standard"
            className={styles.content}
            id="meterage"
            label="Meterage"
            name="meterage"
            autoFocus
            required
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

export default ResponsiveDialogJob;
