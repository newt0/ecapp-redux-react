import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const Login = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>ログインページ</h2>
      <button onClick={() => dispatch(push("/"))}>ログイン</button>
    </div>
  );
};

export default Login;

// connected-react-routerのpushメソッド=urlを遷移する
