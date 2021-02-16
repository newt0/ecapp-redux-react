import React, { useCallback, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UIkit";

const SignUp = (props) => {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  ); // 第二引数が
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text-center u-text__headline">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={"ユーザー名"}
        margin="dense"
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={"text"}
        onChange={inputUsername} // 関数名のまま渡すことに注意
      />
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        margin="dense"
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail} // 関数名のまま渡すことに注意
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        margin="dense"
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword} // 関数名のまま渡すことに注意
      />
      <TextInput
        fullWidth={true}
        label={"パスワード（再確認）"}
        margin="dense"
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword} // 関数名のまま渡すことに注意
      />

      <div className="module-spacer--medium" />

      <div className="center">
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() => console.log("Clicked.")}
        />
      </div>
    </div>
  );
};

export default SignUp;

// onChangeにsetUsernameを設定したいが、子コンポーネントに変更するための関数を渡す時はuseCallbackフックでその関数をメモ化するとパフォーマンスが良くなる
