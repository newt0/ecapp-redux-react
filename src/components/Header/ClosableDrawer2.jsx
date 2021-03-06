import React, { useCallback, useEffect, useState } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { TextInput } from "../UIkit";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HistoryIcon from "@material-ui/icons/History";
import { makeStyles } from "@material-ui/core/styles";
import { signOut } from "../../reducks/users/operations";
import { db } from "../../firebase/index";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: 250,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: "center",
    display: "flex",
    marginLeft: 32,
  },
}));

const ClosableDrawer2 = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { container } = props;
  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback(
    (event) => {
      setKeyword(event.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event); // Header内props.onCloseとして渡ってきたhandleDrawerToggleをメニューが選択されたときに呼び出す　メニューが選択されたらメニューを閉じる
  };

  const menus = [
    {
      func: selectMenu,
      label: "商品登録",
      icon: <AddCircleIcon />,
      id: "register",
      value: "/product/edit",
    },
    {
      func: selectMenu,
      label: "商品履歴",
      icon: <HistoryIcon />,
      id: "history",
      value: "/order/history",
    },
    {
      func: selectMenu,
      label: "プロフィール",
      icon: <PersonIcon />,
      id: "profile",
      value: "/user/mypage",
    },
  ];

  const [filters, setFilters] = useState([
    {
      func: selectMenu,
      label: "全て",
      id: "all",
      value: "/",
    },
    {
      func: selectMenu,
      label: "メンズ",
      id: "male",
      value: "/?gender=male", // クエリパラメータを入れて、genderと言うキーに対してmaleと言うバリューをいれる
    },
    {
      func: selectMenu,
      label: "レディース",
      id: "fermale",
      value: "/?gender=female",
    },
  ]);

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const category = snapshot.data();
          list.push({
            func: selectMenu,
            label: category.name,
            id: category.id,
            value: `/?category=${category.id}`, // カテゴリーというクエリに対してcategory.idを与える
          });
        });
        setFilters((prevState) => [...prevState, ...list]); // prevStateを消すと挙動が正常になる
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(event) => props.onClose(event)}
        classes={{ paper: classes.drawerPaper }}
        // paperというキーに対してclasses.drawerPaperを与える classesは直接定義できない？
        ModalProps={{ keepMounted: true }}
      >
        <div
          onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => props.onClose(e)}
        >
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={"キーワードを入力"}
              multiline={false} // 複数行の入力を許可するか
              required={false}
              rows={1}
              onChange={inputKeyword}
              value={keyword}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem button key={filter.id}>
                <ListItemText
                  primary={filter.label}
                  onClick={(event) => filter.func(event, filter.value)} // eventはprops.onClose(event)に渡す値　filter.valueはdispatch(push(path))に渡す値
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer2;
