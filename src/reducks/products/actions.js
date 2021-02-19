export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products) => {
  // 引数にproductのlistを受け取る
  return {
    type: "FETCH_PRODUCTS",
    payload: products,
  }; // 引数で渡ってきたproductsをそのまま渡す
};
