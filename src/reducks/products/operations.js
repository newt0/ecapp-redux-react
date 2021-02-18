import { db, FirebaseTimestamp } from "../../firebase";
import { push } from "connected-react-router";

const productsRef = db.collection("products");

export const saveProduct = (name, description, category, gender, price) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    // 引数に受け取ったname, description, category, gender, priceをdataのname, description, category, gender, price（キー）の値として格納
    const data = {
      category: category,
      description: description,
      gender: gender,
      name: name,
      price: parseInt(price, 10), // 文字列で受け取った数値を10進数に変える
      updated_at: timestamp,
    };

    const ref = productsRef.doc();
    const id = ref.id;
    data.id = id;
    data.created_at = timestamp;

    return productsRef
      .doc(id)
      .set(data) // 新規作成だから{merge: true}が不要
      .then(dispatch(push("/")))
      .catch((error) => {
        throw new Error(error);
      });
  };
};
