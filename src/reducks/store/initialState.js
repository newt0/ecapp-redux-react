const initialState = {
  products: {
    list: [],
  },
  users: {
    icon: "",
    isSignedIn: false,
    uid: "",
    username: "",
    role: "",
    cart: [], // firestoreではusersのサブコレクション
    orders: [],
  },
};

export default initialState;

// ## initialStateの作り方
// - Storeの初期状態
// - アプリに必要なstateを全て記述
// - exportしておく
