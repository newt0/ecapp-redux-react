import { signInAction } from "./actions";
import { push } from "connected-react-router";

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const url = "https://api.github.com/users/deatiger";

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

// callback関数をreturnする。asyncをつける。
// 引数にdispatchとgetStateを受け取る
// getStateで現在のReduxのstateを受け取って、stateという定数に格納。getStateはメソッドで呼び出す点に注意
//
