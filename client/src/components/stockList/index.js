import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";
import ResponsiveDialogStock from "../stockForm";
import { useQuery } from "@apollo/client";
import { QUERY_STOCK } from "../../utils/queries";
import styles from "../../styles/stock.module.css";

const StockList = () => {
  const [open, setOpen] = useState(false);

  const { loading, data } = useQuery(QUERY_STOCK);
  const stocks = data?.Stock || [];

  if (!stocks.length) {
    return (
      <Container className={styles.Container}>
        <Typography variant="h3">No Stocks avaliable</Typography>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          className={styles.newItemBtn}
        >
          Add New Item
        </Button>
        <ResponsiveDialogStock
          open={open}
          setOpen={setOpen}
        ></ResponsiveDialogStock>
      </Container>
    );
  }
  return (
    <Container className={styles.Container}>
      <h1 className={styles.Header}> Stock List</h1>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        className={styles.newItemBtn}
      >
        Add New Item
      </Button>
      <ResponsiveDialogStock
        open={open}
        setOpen={setOpen}
      ></ResponsiveDialogStock>
      {stocks.map((stock) => (
        <LinkContainer key={stock._id} to={`/stocks/${stock._id}`}>
          <Card key={stock._id} className={styles.card}>
            <CardContent>
              <Typography
                sx={{ fontSize: 20 }}
                className={styles.title}
                color="text.secondary"
              >
                {stock.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Type: {stock.stockType}
              </Typography>
              <Typography variant="body1">
                Quantity: {stock.quantity}
                <br />
                Grit: {stock.grit}
                <br />
                Size: {stock.size}
              </Typography>
            </CardContent>
          </Card>
        </LinkContainer>
      ))}
    </Container>
  );
};

export default StockList;
