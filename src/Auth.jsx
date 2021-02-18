import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenAuthState } from "./reducks/users/operations";
import { getIsSignedIn } from "./reducks/users/selectors";

const Auth = ({ children }) => {
  // childrenはReactの特別なprops
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;

// ## Firebase Authのメソッド①
// createUserWithEmailAndPassword()
// signInWithEmailAndPassword()
//   引数: email: string, password: string
//   戻り値: Promise<firebase.auth.UserCredential>
//   .then(result => { const user = result.user})

// ## Firebase Authのメソッド②
// onAuthStateChanged()
//   引数: なし
//   戻り値: firebase.Observerかfirebase.User
//   役割: 認証状態を監視して変更があったら戻り値を返す

// 基本的には常にfirebase.Observer(認証状態を監視している状態)で値を返していて、認証状態が変更したらfirebase.Userを返す。firebase.UserはFirebase Authで管理しているユーザーの情報を返す
// サインアウトしたらnullを返す。同時にfirebase.Observerになる

// sendPasswordResetEmail()
//   引数: email: string
//   戻り値: Promise<void>
//   役割: PWリセットメールを送る
// 引数に受け取ったemailに対してリセットメールを送る
// このメソッド自体はvoidなので値を返さない。↑処理をするだけ

// children（受け取った子要素）を返す
// -最初のレンダーが終了したらuseEffectが実行される
// ->もしisSignedInがfalseならlistenAuthState()を呼び出す
// ->listenAuthState()は今サインインしている状態なのかをみてくれるので、してないなら/signinに飛ばす
// ->しているならデータベースからユーザーの情報を取得してReduxのStoreを更新する（operation内のAction）
