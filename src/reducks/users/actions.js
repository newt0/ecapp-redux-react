export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username,
      role: userState.role,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = (userState) => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
      role: "",
    },
  };
};

export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductInCartAction = (products) => {
  return {
    type: "FETCH_PRODUCTS_IN_CART",
    payload: products,
  };
};

// ## Actionsの役割
// =アプリからStoreへデータを送るためのpayloadを渡す役割
// ->アプリから受け取ったデータをReducersへ渡す

// ## なぜActionsを使うのか？
// ->純粋なデータのみ記述するため(どのStateをどう変更するかReducersへ任せる)

// ## Actionsはプレーンなオブジェクトを返す
