export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username,
      role: userState.role,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = (userState) => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
    },
  };
};

// ## Actionsの役割
// =アプリからStoreへデータを送るためのpayloadを渡す役割
// ->アプリから受け取ったデータをReducersへ渡す

// ## なぜActionsを使うのか？
// ->純粋なデータのみ記述するため(どのStateをどう変更するかReducersへ任せる)

// ## Actionsはプレーンなオブジェクトを返す
