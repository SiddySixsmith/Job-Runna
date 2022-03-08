import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
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
import UpdateStockForm from "../updateStockForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SingleStock = () => {
  const [openAdd, setOpenADD] = useState(false);
  const [open, setOpen] = useState(false);
  const { _id } = useParams();

  const { loading, data } = useQuery(QUERY_STOCK_BY_ID, {
    variables: { id: _id },
  });
  const stock = data?.getStockById || [];

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

  const handleClickOpenDelete = () => {
    setOpenADD(true);
  };

  const handleClose = () => {
    setOpenADD(false);
  };
  const handleClickOpenUpdate = () => {
    setOpen(true);
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
              <Typography
                sx={{ mb: 1.5 }}
                className={styles.content}
                color="text.secondary"
              >
                {stock.stockType}
              </Typography>
              <Typography
                className={styles.content}
                variant="body1"
                name="quantity"
              >
                Quantity: {stock.quantity}
                <br />
              </Typography>
              <Typography className={styles.content} variant="body1">
                Size: {stock.size}
                <br />
              </Typography>

              <Typography className={styles.content} variant="body1">
                Grit: {stock.grit}
              </Typography>
            </CardContent>

            <Dialog
              open={openAdd}
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
            onClick={handleClickOpenDelete}
            variant="contained"
            className={styles.submitBtn}
          >
            Delete
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            className={styles.submitBtn}
            onClick={() => setOpen(true)}
          >
            update
          </Button>
          <UpdateStockForm
            stock={stock}
            open={open}
            setOpen={setOpen}
            onClick={handleClickOpenUpdate}
          ></UpdateStockForm>
        </Box>
      )}
    </Container>
  );
};
export default SingleStock;
