import React from "react";
import ReactDOM from "react-dom";
import * as History from "history";
import { Provider } from "react-redux";
import { createStore } from "./reducks/store/store";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ## react-reduxのProviderとは
// 1.propsにstoreを渡す
// ->ラップしたコンポーネントにstoreの情報を渡す
// 2.Reactコンポーネント内でreact-reduxのconnect関数を使えるようにする
// ->ReactとReduxを接続してstoreを変更できるように

// store.jsで定義したcreateStore関数を実行することで初めてStoreが作成される

// <Provider>のpropsにstoreを渡し,<App/>をラッピングすることでStoreの情報を参照可能になる

// HistoryからcreateBrowserHistoryメソッドを使用したいので別名import。
// createBrowserHistoryでブラウザの履歴を作成し、historyという定数に格納。
// そのhistoryをcreateStoreの引数に渡す
