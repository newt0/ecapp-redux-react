import React, { useState } from "react";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NoImage from "../../assets/img/src/no_image.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserRole } from "../../reducks/users/selectors";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: 8,
      width: "calc(50% - 16px)", // スマホ表示の時は二列にしたいから50%。 -16pxはmarginで取っている分↑だけ削っている
    },
    [theme.breakpoints.up("sm")]: {
      margin: 16,
      width: "calc(33.3333% - 32px)", // 三列にして両側のmarginを引く
    },
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const images = props.images.length > 0 ? props.images : [NoImage];
  // const price = props?.price?.toLocaleString(); // 3桁区切りでカンマを付けてくれる
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images[0].path}
        onClick={() => dispatch(push("/product/" + props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push("/product/" + props.id))}>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography className={classes.price} component="p">
            ¥{props.price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push("/product/edit") + props.id);
              handleClose();
            }}
          >
            編集する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
