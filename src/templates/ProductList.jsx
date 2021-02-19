import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state); // selectorに現在のReduxのStoreのState全体が入っている
  const products = getProducts(selector);

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row"></div>
    </section>
  );
};

export default ProductList;
