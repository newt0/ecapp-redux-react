import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 24px auto",
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: "auto",
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
}));

const ProductDetail = () => {
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname; // ReduxのStoreで管理しているルーティング(router)の情報の中にlocation.pathnameがある
  const id = path.split("/product/")[1];

  useEffect(() => {
    db.collection("products")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setProduct(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="c-section-wrapin">
      {product ? (
        <div className="-grid__row">
          <div className={classes.sliderBox}></div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{product.price}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ProductDetail;
