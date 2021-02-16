import React from "react";
import { Switch, Route } from "react-router";
import { Login, Home, SignUp } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"(/)?"} component={Home} />
    </Switch>
  );
};

export default Router;

// path={"(/)?"}=/があってもなくても良い

// import { Login, Home } from "./templates";
// =templatesディレクトリのエントリポイントからimportしている
