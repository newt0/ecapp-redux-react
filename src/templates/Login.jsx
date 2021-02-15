import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { signInAction } from "../reducks/users/actions";

const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  console.log(selector.router);

  return (
    <div>
      <h2>ログインページ</h2>
      <button
        onClick={() => {
          dispatch(signInAction({ uid: "222222222", username: "newt02" }));
          dispatch(push("/"));
        }}
      >
        ログイン
      </button>
    </div>
  );
};

export default Login;

// connected-react-routerのpushメソッド=urlを遷移する
