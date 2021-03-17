import React from "react";
import Divider from "@material-ui/core/Divider";
import { OrderedProducts } from "./index";
// import { datetimeToString, dateToString } from "../../function/common";
import { TextDetail } from "../UIkit";
import { orderProduct } from "../../reducks/products/operations";

// Date型を受け取ってString型にする
const datetimeToString = (date) => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) + // JSの1月は0なので+1する必要がある
    "-" +
    ("00" + date.getDate()).slice(-2) +
    ":" +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2)
  );
};

const dateToString = (date) => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2)
  );
};

const OrderHistoryItem = ({ order }) => {
  const orderedDatetime = datetimeToString(order.updated_at.toDate()); // FSのtimestamp型をdate型に変換
  const shippingDate = dateToString(order.shipping_date.toDate());
  const totalPrice = "￥" + order.amount.toLocaleString();

  console.log("shipping_date->", order.shipping_date);

  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetail label="注文ID" value={order.id} />
      <TextDetail label="注文日時" value={orderedDatetime} />
      <TextDetail label="発送予定日" value={shippingDate} />
      <TextDetail label="注文金額" value={totalPrice} />

      {order.products.length > 0 && (
        <OrderedProducts products={order.products} />
      )}

      <div className="module-spacer--extra-extra-small" />
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
