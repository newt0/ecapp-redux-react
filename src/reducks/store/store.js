import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { UsersReducer } from "../users/reducers";
import thunk from "redux-thunk";

export function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}

// ## 1. reduxモジュールのimport
// ## 2. Reducersのimport

// ## createStore関数の定義
// 1. reduxのcreateStoreメソッドをreturn(reduxCreateStoreという別名をつけた)
// // 引数にcombineReducersを受け取る
// 2. combineReducersでstateを生成
// // usersというキーに対してUsersReducerを渡す

// ## combineReducersとは
// 1.分割したReducersをまとめる
// 2.stateのカテゴリ別
// 3.オブジェクトをreturnする（stateのデータ構造）

// ## ルーティング用ライブラリ
// 1.react-router v4以降
// Reactのルーティング用ライブラリ
// 2.connected-react-router
// ReduxのStoreでルーティングを管理
// react-router v4,v5と互換性あり

// ReduxのStoreにrouterというStateを作る。
// ->routerというキーを作り、connectRouter(history)を渡す。
// ->historyが保持する情報をReduxのStoreのrouterというStateで管理できるように
// routerをmiddlewareとして使うという宣言
