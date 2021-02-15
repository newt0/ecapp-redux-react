import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getUserId = createSelector([usersSelector], (state) => state.uid);

// ## 各ファイルの役割|seletor
// 1.Store で制御している state を参照する役割
// 2.reselect という npm モジュールを使う
