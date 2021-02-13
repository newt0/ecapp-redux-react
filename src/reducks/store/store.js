import { createStore as reduxCreateStore, combineReducers } from "redux";
import { UsersReducer } from "../users/reducers";

export default function createStore() {
  return reduxCreateStore(combineReducers({ users: UsersReducer }));
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
