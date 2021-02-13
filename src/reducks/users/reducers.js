import * as Actions from "./actions";
import initialState from "./store/initialState";

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// ## Reducersの役割
// Actionsからデータを受け取り、StoreのStateをどう変更するのかを決める

// ** Reducersの書き方①
// (まずStoreディレクトリ内にinitialStateを作る)
// 1. actionsファイル内の全てのモジュールをimport(Actionsという名前をつける)
// 2. initialStateをimport

// ** Reducersの書き方②
// 第一引数にstate、第二引数のactionがreturnした値を受け取る
// ↑ 基本的には現在のStoreの状態を受け取るが、指定されていない場合はデフォルトでinitialState（初期状態のusersの値）を受け取る
//  ↑　プレーンなオブジェクトを第二引数のactionで受け取る
// Actionsのtypeに応じてstateをどう変更するのかを決める

// ## スプレッド構文を使わない書き方

// ...action.payload↓
// isSignedIn: action.payload.isSignedIn,
// uid: action.payload.uid,
// username: action.payload.username

// ...state↓(Reducersは全て上書きしてしまう)
// icon: "", isSignedIn: false, uid: "", username: "",
