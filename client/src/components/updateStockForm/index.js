/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import { UPDATE_STOCK } from "../../utils/mutations";
import styles from "../../styles/form.module.css";

const UpdateStockForm = (props) => {
  const { stock } = props;

  const [formState, setFormState] = useState({
    name: stock.name,
    stockType: stock.stockType,
    quantity: stock.quantity.toString(),
    size: stock.size,
    grit: stock.grit,
  });
  const [updateStock, { error }] = useMutation(UPDATE_STOCK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateStock({
        variables: {
          name: formState.name,
          stockType: formState.stockType,
          quantity: formState.quantity,
          size: formState.size,
          grit: formState.grit,
        },
      });
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
      <DialogTitle id="responsive-dialog-title" className={styles.header}>
        {"Update Stock item"}
      </DialogTitle>
      <Box component="form" noValidate onSubmit={handleFormSubmit}>
        <DialogContent>
          <TextField
            className={styles.content}
            variant="standard"
            id="name"
            label="Name"
            name="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            className={styles.content}
            variant="standard"
            id="stockType"
            label="Stock Type"
            name="stockType"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            className={styles.content}
            variant="standard"
            id="quantity"
            label="Quantity"
            name="quantity"
            type="number"
            autoFocus
            onChange={handleChange}
          />

          <TextField
            className={styles.content}
            variant="standard"
            id="size"
            label="Size"
            name="size"
            autoFocus
            onChange={handleChange}
          />

          <TextField
            className={styles.content}
            variant="standard"
            id="grit"
            label="Grit"
            name="grit"
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

export default UpdateStockForm;
