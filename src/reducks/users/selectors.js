import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.username
);

export const getProductsInCart = createSelector(
  [usersSelector], // =state.users
  (state) => state.cart // usersのなかのcartの値
);

// ## 各ファイルの役割|seletor
// 1.Store で制御している state を参照する役割
// 2.reselect という npm モジュールを使う
