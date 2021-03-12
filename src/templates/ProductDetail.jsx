import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { db, FirebaseTimestamp } from "../firebase";
import HTMLReactParser from "html-react-parser";
import { ImageSwiper, SizeTable } from "../components/Products";
import { addProductsToCart } from "../reducks/users/operations";

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

const returnCodeToBr = (text) => {
  if (text === "") {
    // stringを受け取って空ならそのまま返す
    return text;
  } else {
    // 空じゃなかったら改行コードを<br>タグに変える。それをHTMLReactParserでパースする
    return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
  }
};

const ProductDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname; // ReduxのStoreで管理しているルーティング(router)の情報の中にlocation.pathnameがある
  const id = path.split("/product/")[1];

  // addProduct関数は実際には<SizeTable />に渡している。子コンポーネント内に渡す時はuseCallbackでコールバック関数をメモ化する
  // const addProduct = useCallback(
  //   (selectedSize) => {
  //     const timestamp = FirebaseTimestamp.now();
  //     dispatch(
  //       addProductsToCart({
  //         added_at: timestamp,
  //         description: product.description,
  //         gender: product.gender,
  //         images: product.images,
  //         name: product.name,
  //         price: product.price,
  //         productId: product.id,
  //         quantity: 1,
  //         size: selectedSize,
  //       })
  //     );
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [product]
  // );
  // // productが更新されたらaddProductも再生成する

  const addProduct = useCallback(
    (selectedSize) => {
      const timestamp = FirebaseTimestamp.now(); // サーバーで管理している現在の時刻をtimestamp型でget
      dispatch(
        addProductsToCart({
          // cartはユーザー毎に持つので、userのsubcollectionとして作成
          added_at: timestamp,
          description: product.description,
          gender: product.gender,
          images: product.images,
          name: product.name,
          price: product.price,
          productId: product.id,
          quantity: 1, // いったん1ずつ追加できるようにしたいので1
          size: selectedSize,
        })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [product]
  );

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
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{product.price}</p>
            <div className="module-spacer--small" />
            <SizeTable addProduct={addProduct} sizes={product.sizes} />
            <div className="module-spacer--small" />
            <p>{returnCodeToBr(product.description)}</p>
            {/* 元々文字列だったものがHTMLタグに変換されてReactコンポーネント内で表示可能に */}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ProductDetail;
