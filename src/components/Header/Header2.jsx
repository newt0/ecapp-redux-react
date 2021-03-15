import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import logo from "../../assets/img/icons/logo.png";
import { AppBar, Toolbar } from "@material-ui/core";
import { HeaderMenus2, ClosableDrawer2 } from "./index";
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

const Header2 = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return; // この関数を終了する
      }

      setOpen(!open); // そうじゃないなら反対の値を渡す
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolbar}>
          <img
            src={logo}
            alt="logo"
            width="128px" //widthを直接指定できる
            onClick={() => dispatch(push("/"))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              {/* MUIのコンポーネントに直接CSS当てない */}
              <HeaderMenus2 handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer2 open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header2;
