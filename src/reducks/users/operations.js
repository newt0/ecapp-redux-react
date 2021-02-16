import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";

// export const signIn = () => {
//   return async (dispatch, getState) => {
//     const state = getState();
//     const isSignedIn = state.users.isSignedIn;

//     if (!isSignedIn) {
//       const url = "https://api.github.com/users/newt0";

//       const response = await fetch(url)
//         .then((res) => res.json())
//         .catch(() => null);

//       const username = response.login;

//       dispatch(
//         signInAction({
//           isSignedIn: true,
//           uid: "333333",
//           username: username,
//         })
//       );
//       dispatch(push("/"));
//     }
//   };
// };

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
          const uid = user.uid;
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
            .then(() => dispatch(push()));
          // doc(uid) -> usersコレクションのuidとAuthのuidを一致させる
        }
      });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      alert("必須項目が未入力です。");
      return false;
    }
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data(); // firestoreから取得したデータがdataに格納されている

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role, // userのdataのrole
                uid: uid, // 既に取得している。認証したときのuid
                username: data.username,
              })
            );

            dispatch(push(""));
          });
      }
    });
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        // ユーザーが認証されている状態ならそのユーザーの情報をデータベースから取得してReduxのStoreにStateを持たせる
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                uid: uid,
                username: data.username,
                role: data.role,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction()); // ReduxのStoreを初期状態に戻す
      dispatch(push("/signin"));
    });
  };
};

// callback関数をreturnする。asyncをつける。
// 引数にdispatchとgetStateを受け取る
// getStateで現在のReduxのstateを受け取って、stateという定数に格納。getStateはメソッドで呼び出す点に注意

// ## 各ファイルの役割|operations
// 1. 複雑な処理を任せられる
// 2. redux-thunk で非同期処理を制御する
// 3. Actions を呼び出す
