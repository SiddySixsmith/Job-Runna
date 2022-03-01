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

const ResponsiveDialogJob = (props) => {
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
      <DialogTitle id="responsive-dialog-title">
        {"Add a new job item"}
      </DialogTitle>
      <Box component="form" noValidate onSubmit={handleFormSubmit}>
        <DialogContent>
          <TextField
            variant="standard"
            className="textField"
            id="siteAddress"
            label="Site Address"
            name="siteAddress"
            autoFocus
            required
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            variant="standard"
            className="textField"
            id="jobDescription"
            label="Job Description"
            name="jobDescription"
            autoFocus
            required
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            variant="standard"
            className="textField"
            id="builderName"
            label="Builders Name"
            name="builderName"
            autoFocus
            required
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            variant="standard"
            className="textField"
            id="contact"
            label="Contact"
            name="contact"
            autoFocus
            required
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            variant="standard"
            className="textField"
            id="contactNumber"
            label="Contact Number"
            name="contactNumber"
            autoFocus
            required
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            variant="standard"
            className="textField"
            id="startDate"
            label="Start Date"
            name="startDate"
            autoFocus
            required
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            variant="standard"
            className="textField"
            id="endDate"
            label="End Date"
            name="endDate"
            autoFocus
            required
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            variant="standard"
            className="textField"
            id="meterage"
            label="Meterage"
            name="meterage"
            autoFocus
            required
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ResponsiveDialogJob;
