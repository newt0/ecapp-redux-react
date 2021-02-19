import Router from "./Router";
import "./assets/reset.css";
import "./assets/style.css";

const App = () => {
  return (
    <main>
      <Router />
    </main>
  );
};

export default App;

// error:
// ->import { Router } from "react-router":にしていた
// ->ReactとReduxのStoreの繋ぎこみのミスかと思ったが、App.js内で<Router/>をコメントアウトしたらエラー吐かなくなったため原因が推測できる
