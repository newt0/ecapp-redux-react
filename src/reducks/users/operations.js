import { signInAction } from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const url = "https://api.github.com/users/newt0";

      const response = await fetch(url)
        .then((res) => res.json())
        .catch(() => null);

      const username = response.login;

      dispatch(
        signInAction({
          isSignedIn: true,
          uid: "333333",
          username: username,
        })
      );
      dispatch(push("/"));
    }
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // getStateを今回は使わない
    // validation
    if (
      (username === "") |
      (email === "") |
      (password === "") |
      (confirmPassword === "")
    ) {
      alert("必須項目が未入力です");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致していません。もう一度お試しください。");
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user; // resultはuserという値を持っているため、定数に格納
        if (user) {
          const uid = user.id;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp, // 新規作成なのでcreated_atと同じ
            username: username,
          };

          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => dispatch(push("/")));
          // doc(uid) -> usersコレクションのuidとAuthのuidを一致させる
        }
      });
  };
};

// callback関数をreturnする。asyncをつける。
// 引数にdispatchとgetStateを受け取る
// getStateで現在のReduxのstateを受け取って、stateという定数に格納。getStateはメソッドで呼び出す点に注意
