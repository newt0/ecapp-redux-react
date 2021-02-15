## redux-thunk とは

Redux で非同期処理を扱うライブラリ

通常の Actions は Action Object を受け取る
= 関数を受け取ることができない
= async/await や Promise を使えない

## redux-thunk の導入方法

1. モジュールの import
2. applyMiddleware()に追加
   （ストアに書いていく）

## redux-thunk の基礎文法

関数を定義する。
いきなり return して,コールバック関数を return する。
そのコールバック関数には async をつけることができ、この処理の中では非同期処理の await ができるようになる。
引数には dispach と getState を受け取ることができる（getState は使わない時もある）
getState を getState()のようにメソッドで呼び出すと、現在の Redux の Store の情報を取得できる。
処理は非同期処理なので await で実行結果を待ち、あとでその内容を使うことができる。
dispatch を使って Actions を呼び出して使える。

```js
export const signIn = (email, password) => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const userData = await emailSignIn(email, password);
      dispatch(
        signInAction({
          isSignedIn: true,
          uid: "002",
          username: "newt02",
        })
      );
    }
  };
};
```
