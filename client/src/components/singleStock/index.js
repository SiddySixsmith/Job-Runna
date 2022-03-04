import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_STOCK_BY_ID } from "../../utils/queries";
import styles from "../../styles/stock.module.css";
import { DELETE_STOCK } from "../../utils/mutations";
import { LinkContainer } from "react-router-bootstrap";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SingleStock = () => {
  const [open, setOpen] = useState(false);
  const { _id } = useParams();

  const { loading, data } = useQuery(QUERY_STOCK_BY_ID, {
    variables: { id: _id },
  });
  const stock = data?.getStockById || [];

  const [quantityState, setQuantityState] = useState(stock.quantity);

  const [deleteStock, { error }] = useMutation(DELETE_STOCK);

  const handleDeleteJob = async (id) => {
    try {
      const { data } = await deleteStock({
        variables: { id },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container className={styles.Container}>
      <h1 className={styles.Header}> {stock.name}</h1>
      {loading ? (
        <div>loading...... </div>
      ) : (
        <Box>
          <Card className={styles.card}>
            <CardContent>
              <Typography
                sx={{ fontSize: 20 }}
                className={styles.title}
                color="text.secondary"
              >
                {stock.stockType}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {stock.stockType}
              </Typography>
              <Typography variant="body1" name="quantity">
                Quantity: {quantityState}
                <br />
              </Typography>
              <Typography variant="body1">
                Size: {stock.size}
                <br />
              </Typography>

              <Typography variant="body1">Grit: {stock.grit}</Typography>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                id="signupSubmit"
                className={styles.addBtn}
                onClick={() => setQuantityState(quantityState + 1)}
              >
                +
              </Button>
              <Button
                type="submit"
                variant="contained"
                id="signupSubmit"
                className={styles.subtractBtn}
                onClick={() => setQuantityState(quantityState - 1)}
              >
                -
              </Button>
            </CardActions>

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Are you sure"}</DialogTitle>
              <DialogContent></DialogContent>
              <DialogActions>
                <Button name="cancel" onClick={handleClose}>
                  no
                </Button>
                <LinkContainer to={"/stock"}>
                  <Button
                    name="Delete"
                    onClick={() => handleDeleteJob(stock._id)}
                  >
                    Yes
                  </Button>
                </LinkContainer>
              </DialogActions>
            </Dialog>
          </Card>

          <Button
            onClick={handleClickOpen}
            variant="contained"
            className={styles.submitBtn}
          >
            Delete
          </Button>
          <br />
          <br />
          <Button variant="contained" className={styles.submitBtn}>
            update
          </Button>
        </Box>
      )}
    </Container>
  );
};
export default SingleStock;
