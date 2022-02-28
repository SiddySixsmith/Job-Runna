import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const ResponsiveDialogJob = (props) => {
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
      <DialogContent>
        <TextField
          variant="standard"
          className="textField"
          id="siteAddress"
          label="Site Address"
          name="siteAddress"
          autoFocus
          required
          // onChange={handleChange}
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
          // onChange={handleChange}
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
          // onChange={handleChange}
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
          // onChange={handleChange}
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
          // onChange={handleChange}
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
          // onChange={handleChange}
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
          // onChange={handleChange}
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
          // onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleClose} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponsiveDialogJob;
