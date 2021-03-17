import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { getOrdersHistory } from "../reducks/users/selectors";
import { OrderHistoryItem } from "../components/Products";
import { fetchOrdersHistory } from "../reducks/users/operations";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  orderList: {
    background: theme.palette.grey["100"],
    margin: "0 auto",
    padding: 32,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: 768,
    },
  },
}));

const OrderHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  return (
    <section className="c-section-wrapin">
      <List className={classes.orderList}></List>
    </section>
  );
};

export default OrderHistory;
