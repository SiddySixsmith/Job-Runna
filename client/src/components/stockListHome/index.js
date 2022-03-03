import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { QUERY_STOCK } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import ResponsiveDialog from "../stockForm";
import styles from "../../styles/listItems.module.css";
import { Link } from "react-router-dom";

const StockListHome = () => {
  const [open, setOpen] = useState(false);

  const { loading, data } = useQuery(QUERY_STOCK);
  const stocks = data?.Stock || [];
  if (!stocks.length) {
    return (
      <Container className={styles.noStock}>
        <Typography variant="h5">No Stock avaliable</Typography>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          className={styles.newItemBtn}
        >
          Add New Item
        </Button>
        <ResponsiveDialog open={open} setOpen={setOpen}></ResponsiveDialog>
      </Container>
    );
  }
  return (
    <Container>
      <List
        className={styles.listContainer}
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {stocks
          .filter((_, index) => index < 3)
          .map((stock) => (
            <Link
              key={stock._id}
              to={`/stocks/${stock._id}`}
              className={styles.links}
            >
              <ListItem className={styles.item}>
                <ListItemText primary={stock.name} secondary={stock.quantity} />
              </ListItem>
            </Link>
          ))}
      </List>
    </Container>
  );
};

export default StockListHome;
