import * as Actions from "./actions";
import initialState from "../store/initialState";

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      };
    // ReduxのStoreで保持しているメモリー情報を更新するために、元々配列のproductsを展開してから配列に埋め込む。コンポーネント側でデータの更新を検知可能に

    case Actions.DELETE_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      };

    default:
      return state;
  }
};
