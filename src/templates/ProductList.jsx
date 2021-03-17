import React, { useEffect } from "react";
import { ProductCard } from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../reducks/products/selectors";
import { fetchProducts } from "../reducks/products/operations";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state); // selectorに現在のReduxのStoreのState全体が入っている
  const products = getProducts(selector);

  // const query = window.location.search; // urlのクエリパラメータが入る]
  // const gender = /^\?gender=/.test(query) ? query.split("?gender=")[1] : "";
  // const category = /^\?category=/.test(query)
  //   ? query.split("?category=")[1]
  //   : "";

  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) //testメソッドで?genderが正規表現に当てはまるかチェック
    ? query.split("?gender=")[1] // ?gender以降のクエリ
    : "";

  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";

  useEffect(() => {
    dispatch(fetchProducts(gender, category));
  }, [query]);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products?.length > 0
          ? products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                images={product.images}
                price={product.price}
              />
            ))
          : null}
      </div>
    </section>
  );
};

export default ProductList;
