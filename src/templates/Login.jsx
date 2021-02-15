import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../reducks/users/operations";

const Login = () => {
  const dispatch = useDispatch();
  // const selector = useSelector((state) => state);

  // console.log(selector.router);

  return (
    <div>
      <h2>ログインページ</h2>
      <button onClick={() => dispatch(signIn())}>ログイン</button>
    </div>
  );
};

export default Login;

// connected-react-routerのpushメソッド=urlを遷移する
