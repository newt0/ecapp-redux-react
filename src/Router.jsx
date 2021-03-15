import React from "react";
import { Switch, Route } from "react-router";
import {
  SignUp,
  SignIn,
  Reset,
  ProductEdit,
  ProductList,
  ProductDetail,
  CartList,
  CartList2,
  OrderConfirm,
  OrderConfirm2,
} from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />

      <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route exact path={"/product/:id"} component={ProductDetail} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />

        <Route exact path={"/cart"} component={CartList2} />
        <Route exact path={"/order/confirm"} component={OrderConfirm2} />
      </Auth>
    </Switch>
  );
};

export default Router;

// path={"(/)?"}=/があってもなくても良い

// import { Login, Home } from "./templates";
// =templatesディレクトリのエントリポイントからimportしている
