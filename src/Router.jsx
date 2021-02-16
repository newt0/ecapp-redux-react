import React from "react";
import { Switch, Route } from "react-router";
import { Home, SignUp, SignIn } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Auth>
        <Route exact path={"(/)?"} component={Home} />
      </Auth>
    </Switch>
  );
};

export default Router;

// path={"(/)?"}=/があってもなくても良い

// import { Login, Home } from "./templates";
// =templatesディレクトリのエントリポイントからimportしている
