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

export const fetchProducts = (gender, category) => {
  return async (dispatch) => {
    let query = productsRef.orderBy("updated_at", "desc");
    query = gender !== "" ? query.where("gender", "==", gender) : query;
    query = category !== "" ? query.where("category", "==", category) : query;

    query.get().then((snapshots) => {
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

export const orderProduct = (productsInCart, total_price) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection("users").doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products = {};
    let soldOutProducts = [];

    const batch = db.batch();
    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const sizes = snapshot.data().sizes;

      //全部回したmapの結果をupdatedSizesに入れておく
      const updatedSizes = sizes.map((size) => {
        // 購入したら在庫が減る処理
        if (size.size === product.size) {
          if (size.quantity === 0) {
            // カート内に入れている間に他の誰かに買われた
            soldOutProducts.push(product.name);
            return size; // 数に変化がないのでそのままsizeを返す
          }

          return {
            size: size.size,
            quantity: size.quantity - 1,
          };
        } else {
          // 今回選んだサイズでなければそのままsizeを返す
          return size;
        }
      });

      products[product.productId] = {
        // 今回注文したidを持つオブジェクトとして
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      };

      batch.update(
        productsRef.doc(product.productId),
        { sizes: updatedSizes } // 在庫が一つ減った状態で更新をかける
      );

      batch.delete(
        userRef.collection("cart").doc(product.cartId) // userコレクション内のcartサブコレクションの中から今回注文したcartIdのcartドキュメントを削除する
      );
    }

    if (soldOutProducts.length > 0) {
      // 一つでも売り切れのものがあったらbatchのcommitをせずにエラーメッセージを出し、商品は注文されない
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join("と") // soldOutProductsが複数あるなら「シャツとパンツ」が売り切れですのように表示する
          : soldOutProducts[0]; // 一つだけ売り切れならそのままその商品名を返す
      alert(`大変申し訳ありません。${errorMessage}が在庫切れとなったため
      注文処理を中断しました`);
    } else {
      // 全て在庫あるなら注文処理を実行する
      batch
        .commit()
        .then(() => {
          const orderRef = userRef.collection("orders").doc();
          const date = timestamp.toDate(); // 今日の日付
          const shippingDate = FirebaseTimestamp.fromDate(
            // fromDateでtimestamp型のものからfirebase用のtimestampを作る
            new Date(date.setDate(date.getDate() + 3)) // 今日の日付から3日間足した日付
          );

          const history = {
            amount: total_price,
            created_at: timestamp, //created_atとupdated_atは基本的に全てのデータに持たせる
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp,
          };

          orderRef.set(history);
          dispatch("/order/complete");
        })
        .catch(() => {
          alert("注文処理に失敗しました");
        });
    }
  };
};

// export const orderProduct = (productsInCart, amount) => {
//   return async (dispatch, getState) => {
//     const uid = getState().users.uid;
//     const userRef = db.collection("users").doc(uid);
//     const timestamp = FirebaseTimestamp.now();
//     let products = [];
//     let soldOutProducts = [];

//     for (const product of productsInCart) {
//       const snapshot = await productsRef.doc(product.productId).get();
//       const sizes = snapshot.data().sizes;
//       const batch = db.batch();

//       const updateSizes = sizes.map((size) => {
//         if (size.size === product.size) {
//           if (size.quantity === 0) {
//             soldOutProducts.push(product.name);
//             return size;
//           }
//           return {
//             size: size.size,
//             quantity: size.quantity - 1,
//           };
//         } else {
//           return size;
//         }
//       });

//       products.push({
//         id: product.productId,
//         images: product.images,
//         name: product.name,
//         price: product.price,
//         size: product.size,
//       });

//       batch.update(productsRef.doc(product.productId), { sizes: updateSizes });
//       batch.delete(userRef.collection("cart").doc(product.cartId));

//       if (soldOutProducts.length > 0) {
//         const errorMessage =
//           soldOutProducts > 0 ? soldOutProducts.join("と") : soldOutProducts[0];
//         alert(
//           `大変申し訳ありません。${errorMessage}が在庫切れとなったため、注文処理を中断しました。`
//         );
//         return false;
//       } else {
//         batch
//           .commit()
//           .then(() => {
//             const orderRef = userRef.collection("orders").doc();
//             const date = timestamp.toDate();
//             const shippingDate = FirebaseTimestamp.fromDate(
//               new Date(date.setDate(date.getDate() + 3))
//             );

//             const history = {
//               amount: amount,
//               created_at: timestamp,
//               products: products,
//               shippingDate: shippingDate,
//               updated_at: timestamp,
//             };

//             orderRef.set(history);

//             dispatch(push("/order/complete"));
//           })
//           .catch(() => {
//             alert(
//               "注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。"
//             );
//             return false;
//           });
//       }
//     }
//   };
// };
