import React, { useCallback, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import logo from "../../assets/img/icons/logo.png";
import { getIsSignedIn } from "../../reducks/users/selectors";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  toolbar: {
    margin: "0 auto",
    maxWidth: 1024,
    width: "100%",
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
});

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSigneIn = getIsSignedIn(selector);
  return (
    <div className={classes.root}>
      <AppBar className={classes.menuBar} position="fixed">
        <Toolbar className={classes.toolbar}>
          <img
            src={logo}
            alt="logo"
            width="128px"
            onClick={() => dispatch(push("/"))}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
