import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_STOCK_BY_ID } from "../../utils/queries";
import styles from "../../styles/stock.module.css";
import { UPDATE_STOCK } from "../../utils/mutations";

const SingleStock = () => {
  const { _id } = useParams();

  const { loading, data } = useQuery(QUERY_STOCK_BY_ID, {
    variables: { id: _id },
  });
  const stock = data?.getStockById || [];

  const [quantityState, setQuantityState] = useState(stock.quantity);

  const [updateStockQauntity, { error }] = useMutation(UPDATE_STOCK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateStockQauntity({
        quantity: quantityState.quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className={styles.Container}>
      <h1 className={styles.Header}> {stock.name}</h1>
      {loading ? (
        <div>loading...... </div>
      ) : (
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
        </Card>
      )}
    </Container>
  );
};
export default SingleStock;
