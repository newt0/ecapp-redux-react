import { db, FirebaseTimestamp } from "../../firebase";
import { push } from "connected-react-router";
import { fetchProductsAction, deleteProductAction } from "./actions";

const productsRef = db.collection("products");

export const saveProduct = (
  id,
  name,
  description,
  category,
  gender,
  price,
  sizes,
  images
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    // 引数に受け取ったname, description, category, gender, priceをdataのname, description, category, gender, price（キー）の値として格納

    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10), // 文字列で受け取った数値を10進数に変える
      sizes: sizes,
      updated_at: timestamp,
    };

    if (id === "") {
      const ref = productsRef.doc();
      data.created_at = timestamp;
      id = ref.id; // 新しくidを宣言するのではなく、引数で渡ってきたidを更新する。
      data.id = id; // ↑でconstをつけるとidの参照先が↑になってしまう。今のままだと参照先が引数のidになる
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
        const productList = [];
        snapshots.forEach((snapshot) => {
          const product = snapshot.data();
          productList.push(product);
        });

        dispatch(fetchProductsAction(productList));
      });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    // getStateでopration内で現在のStoreの情報を取得できる
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list; // 現在のproductsのlistを取得
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id // 今回渡ってきたid以外の配列を新しく作る
        );
        dispatch(deleteProductAction(nextProducts));
      });
  };
};
