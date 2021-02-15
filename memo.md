## re-ducks パターンとは

1. Redux のディレクトリ構成
2. ファイルを管理しやすくなる
3. ducks パターンから派生

## re-ducks パターンのメリット

1.actions と reducers がシンプルになる 2.ファイルが肥大化しにくくなる 3.ファイル毎の役割が明確で管理しやすい

## 各ファイルの役割|operations

1. 複雑な処理を任せられる
2. redux-thunk で非同期処理を制御する
3. Actions を呼び出す

## 各ファイルの役割|types

1. Typescript で使う
2. 型定義を記述して export

## 各ファイルの役割|seletor

1.Store で制御している state を参照する役割
2.reselect という npm モジュールを使う

```js
import { createSelector } from "reselect";

const usersSelector = (state) => state.user;
export const getUserId = create;
```
